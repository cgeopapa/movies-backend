package com.example.moviesbackend;

import com.example.moviesbackend.dao.UserDAO;
import com.example.moviesbackend.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class WebController {
    @Autowired
    private UserDAO userDAO;

    @GetMapping
    public String index() {
        return "index";
    }

    @RequestMapping(value = "/register")
    public String getRegister() {
        return "register";
    }

    @PostMapping("/register")
    public String postRegister(User user, Model model) {
        String email = user.getEmail();
        if (email != null && userDAO.findByEmail(email) == null) {
            userDAO.save(user);
            return "index";
        }
        model.addAttribute("logError", "logError");
        return "register";
    }

    @PostMapping("/login")
//    @ResponseBody
    public ResponseEntity postLogin(User user) {
        String email = user.getEmail();
        String pass = user.getPassword();
        User userdb = userDAO.findByEmail(email);
        ResponseEntity responseEntity;

        if (userdb != null && userdb.getPassword().equals(pass)) {
            System.out.println("LogIn");
            responseEntity = new ResponseEntity(HttpStatus.OK);
        } else {
            responseEntity = new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }
        return responseEntity;
    }

    @PostMapping("/register")
    public ResponseEntity postRegister(User user) {
        String email = user.getEmail();
        String pass = user.getPassword();
        String passRepeat = user.getRepeatPass();
        User userdb = userDAO.findByEmail(email);
        ResponseEntity responseEntity;

        if (userdb == null && email != null && pass.equals(passRepeat)) {
            System.out.println("Register");
            userDAO.save(user);
            responseEntity = new ResponseEntity(HttpStatus.OK);
        } else {
            responseEntity = new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
        return responseEntity;
    }
}
