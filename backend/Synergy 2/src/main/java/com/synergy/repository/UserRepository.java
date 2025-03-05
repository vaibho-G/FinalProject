package com.synergy.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.synergy.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // Additional custom queries can go here if needed
	Optional<User> findByEmailAndPassword(String email, String password);
	Optional<User> findByEmail(String email);
	boolean existsByEmail(String email);
}
