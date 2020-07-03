package com.example.moviesbackend.dao;

import com.example.moviesbackend.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserDAO extends JpaRepository<UserModel, Integer>
{
    @Query("SELECT u FROM User u WHERE u.email = ?1")
    UserModel findByEmail(String email);
}
