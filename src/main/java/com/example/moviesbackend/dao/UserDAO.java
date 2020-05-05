package com.example.moviesbackend.dao;

import com.example.moviesbackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserDAO extends JpaRepository<User, Integer>
{
    @Query("SELECT u FROM User u WHERE u.email = ?1")
    User findByEmail(String email);
}
