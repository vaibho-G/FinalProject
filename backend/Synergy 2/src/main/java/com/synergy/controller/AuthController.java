package com.synergy.controller;

import java.time.LocalDate;
import java.time.Period;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import com.synergy.dto.AuthResponse;
import com.synergy.dto.ForgotPasswordRequest;
import com.synergy.dto.LoginRequest;
import com.synergy.dto.MessageResponse;
import com.synergy.dto.ResetPasswordRequest;
import com.synergy.dto.SignUpRequest;
import com.synergy.model.User;
import com.synergy.repository.UserRepository;
import com.synergy.security.JwtUtil;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/synergy/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {
	
	private final JavaMailSender emailSender;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserDetailsService userDetailsService;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    public AuthController(AuthenticationManager authenticationManager,
                         JwtUtil jwtUtil,
                         UserDetailsService userDetailsService,
                         PasswordEncoder passwordEncoder,
                         UserRepository userRepository,
                         JavaMailSender emailSender) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.emailSender = emailSender;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
            );

            final UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getEmail());
            final String jwt = jwtUtil.generateToken(userDetails);
       
            return ResponseEntity.ok(new AuthResponse(jwt));
            
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(new MessageResponse("Invalid email or password"));
        }
    }

    @PostMapping("/create")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {
        try {
            // Validate email uniqueness
            if (userRepository.existsByEmail(signUpRequest.getEmail())) {
                return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
            }

            // Validate age (must be 18 or older)
            LocalDate dob = signUpRequest.getDateOfBirth();
            if (Period.between(dob, LocalDate.now()).getYears() < 18) {
                return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: Must be 18 or older to register"));
            }

            // Validate preferred age range
            if (signUpRequest.getPreferredMaxAge() <= signUpRequest.getPreferredMinAge()) {
                return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: Maximum age must be greater than minimum age"));
            }

            // Create new user
            User user = new User();
            user.setEmail(signUpRequest.getEmail());
            user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
            user.setFirstName(signUpRequest.getFirstName());
            user.setLastName(signUpRequest.getLastName());
            user.setGender(signUpRequest.getGender());
            user.setBio(signUpRequest.getBio());
            user.setPreferredGender(signUpRequest.getPreferredGender());    
            user.setSocialType(signUpRequest.getSocialType());     
            user.setNotification(signUpRequest.getNotification());

            userRepository.save(user);
            
         // Generate token for the new user
            UserDetails userDetails = userDetailsService.loadUserByUsername(user.getEmail());
            String jwt = jwtUtil.generateToken(userDetails);
            
            return ResponseEntity.ok(new AuthResponse(jwt));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }
    
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody ForgotPasswordRequest request) {
        if (request.getEmail() == null || request.getEmail().isEmpty()) {
            return ResponseEntity.badRequest()
                .body(new MessageResponse("Error: Email is required"));
        }
        
        try {
            // Check if user exists
            User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found with this email"));

            // Generate password reset token
            String token = jwtUtil.generatePasswordResetToken(user.getEmail());

            // Create password reset link
            String resetLink = "http://localhost:3000/reset-password?token=" + token;

            // Send email
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(request.getEmail());
            message.setSubject("Password Reset Request");
            message.setText("To reset your password, click the link below:\n\n" + resetLink + 
                          "\n\nThis link will expire in 1 hour.");

            emailSender.send(message);

            return ResponseEntity.ok(new MessageResponse("Password reset link sent to your email"));
            
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }
    
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest request) {
        try {
            // Validate token
            String email = jwtUtil.validatePasswordResetToken(request.getToken());
            if (email == null) {
                return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: Invalid or expired token"));
            }

            // Find user
            User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

            // Update password
            user.setPassword(passwordEncoder.encode(request.getNewPassword()));
            userRepository.save(user);

            return ResponseEntity.ok(new MessageResponse("Password has been reset successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }
}