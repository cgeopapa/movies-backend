package com.example.moviesbackend.dao;

import com.example.moviesbackend.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserDAO extends JpaRepository<UserModel, Integer>
{
    @Query(value = "SELECT u.* FROM user_model u WHERE u.email = ?1", nativeQuery = true)
    UserModel findByEmail(String email);
}
