package com.example.moviesbackend.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

@Entity
public class User
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotNull
    @Column(unique = true)
    private String email;

    @NotNull
    private String password;
    private String repeatPass;

    @ElementCollection
    private List<String> bookmarks;

    public User()
    {
    }

    public User(int id, String email, String password, String repeatPass,List<String> bookmarks)
    {
        this.id = id;
        this.email = email;
        this.password = password;
        this.repeatPass=repeatPass;
        this.bookmarks = bookmarks;
    }

    public long getId()
    {
        return id;
    }

    public void setId(int id)
    {
        this.id = id;
    }

    public String getEmail()
    {
        return email;
    }

    public void setEmail(String email)
    {
        this.email = email;
    }

    public String getPassword()
    {
        return password;
    }

    public void setPassword(String password)
    {
        this.password = Integer.toString(password.hashCode());
    }

    public String getRepeatPass(){
        return repeatPass;
    }

    public void setRepeatPass(String repeatPass){
        this.repeatPass=repeatPass;
    }

    public List<String> getBookmarks()
    {
        return bookmarks;
    }

    public void setBookmarks(List<String> bookmarks)
    {
        this.bookmarks = bookmarks;
    }
}
