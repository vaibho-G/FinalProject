package com.synergy.dto;


import lombok.Data;
import jakarta.validation.constraints.*;
import java.time.LocalDate;

@Data
public class SignUpRequest {
    @NotBlank(message = "Email is required")
    @Email(message = "Please provide a valid email address")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters long")
    private String password;

    @NotBlank(message = "First name is required")
    private String firstName;

    @NotBlank(message = "Last name is required")
    private String lastName;

    @NotNull(message = "Date of birth is required")
    private LocalDate dateOfBirth;

    private Boolean gender; // true for Male, false for Female

    @NotBlank(message = "Bio is required")
    @Size(max = 500, message = "Bio cannot exceed 500 characters")
    private String bio;

    private Boolean preferredGender; // true for Male, false for Female

    @Min(value = 18, message = "Minimum age must be at least 18")
    private Integer preferredMinAge;

    @Max(value = 100, message = "Maximum age cannot exceed 100")
    private Integer preferredMaxAge;

    @NotBlank(message = "Location is required")
 

    private String socialType = "LOCAL"; // Default value


    private Boolean notification = true; // Default value
}