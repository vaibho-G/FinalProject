package com.synergy.model;

import java.sql.Date;
import java.util.HashSet;
import java.util.Set;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import com.synergy.model.Picture;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity 
@Getter
@Setter
@DynamicInsert 
@DynamicUpdate
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty @Email
    @Column(unique = true, columnDefinition = "VARCHAR(30)")
    private String email;
    
    private String password;

    @Column(columnDefinition = "VARCHAR(15)")
    private String firstName;

    @Column(columnDefinition = "VARCHAR(15)")
    private String lastName;

    private Date dateOfBirth;

    @Column(columnDefinition = "TINYINT")
    private boolean gender = false;

    private Double latitude;

    private Double longitude;

    @Column(columnDefinition = "VARCHAR(500)")
    private String bio;

    @Column(columnDefinition = "TINYINT")
    private boolean notification = true;

    @Column(columnDefinition = "TINYINT")
    private boolean preferredGender = false;

    private Short preferredMinAge = 0;

    private Short preferredMaxAge = 100;

    private Short preferredMaxRange = 310;

    @NotEmpty @Column(columnDefinition = "VARCHAR(10)")
    private String socialType;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "user")
    private Set<Picture> pictures = new HashSet<>();

    // Only For Wrapping
    private Short age;

    // Only For Wrapping
    private Float distance;

}