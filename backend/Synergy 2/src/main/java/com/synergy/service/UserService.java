package com.synergy.service;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.synergy.exception.ResourceNotFoundException;
import com.synergy.model.User;
import com.synergy.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class UserService {
	
	private static final Logger logger = LoggerFactory.getLogger(UserService.class);
	
    @Autowired
    private UserRepository userRepository;
//    	private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    // Create a user
    public User saveUser(User user) {
//    	user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }
    
    public User authenticateUser(String email, String password) {
        return userRepository.findByEmailAndPassword(email, password)
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));
    }
    
    // Retrieve all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Retrieve a user by ID
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }
    
    // update a user
    public User updateUser(Long id, User userDetails) {
        return userRepository.findById(id).map(user -> {
            user.setFirstName(userDetails.getFirstName());
            user.setLastName(userDetails.getLastName());
            user.setEmail(userDetails.getEmail());
            user.setPassword(userDetails.getPassword());
            user.setDateOfBirth(userDetails.getDateOfBirth());
            user.setGender(userDetails.isGender());
            user.setLatitude(userDetails.getLatitude());
            user.setLongitude(userDetails.getLongitude());
            user.setBio(userDetails.getBio());
            user.setNotification(userDetails.isNotification());
            user.setPreferredGender(userDetails.isPreferredGender());
            user.setPreferredMinAge(userDetails.getPreferredMinAge());
            user.setPreferredMaxAge(userDetails.getPreferredMaxAge());
            user.setPreferredMaxRange(userDetails.getPreferredMaxRange());
            user.setSocialType(userDetails.getSocialType());
            return userRepository.save(user);
        }).orElseThrow(() -> new RuntimeException("User not found with ID: " + id));
    }
    
    // Delete a user by ID
    public void deleteUser(Long id) {
    	try {
            logger.debug("Attempting to delete user with id: {}", id);
            
            if (!userRepository.existsById(id)) {
                logger.error("User not found with id: {}", id);
                throw new ResourceNotFoundException("User not found with id: " + id);
            }
            
            userRepository.deleteById(id);
            logger.info("Successfully deleted user with id: {}", id);
        } catch (ResourceNotFoundException e) {
            throw e;
        } catch (Exception e) {
            logger.error("Error deleting user with id: {}", id, e);
            throw new RuntimeException("Error deleting user with id: " + id, e);
        }
    
    }
}
