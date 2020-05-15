package com.example.moviesbackend;

import com.example.moviesbackend.dao.UserDAO;
import com.example.moviesbackend.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

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

//    @PostMapping("/register")
//    public String postRegister(User user, Model model) {
//        String email = user.getEmail();
//        if (email != null && userDAO.findByEmail(email) == null) {
//            userDAO.save(user);
//            return "index";
//        }
//        model.addAttribute("logError", "logError");
//        return "register";
//    }

    @PostMapping("/login")
    @ResponseBody
    public ResponseEntity postLogin(User user, HttpServletResponse response)
    {
        String email = user.getEmail();
        String pass = user.getPassword();
        User userdb = userDAO.findByEmail(email);
        ResponseEntity responseEntity;

        if(userdb != null && userdb.getPassword().equals(pass))
        {
            System.out.println("LogIn of user id: " + userdb.getId());

            Cookie cookie = new Cookie("id", Long.toString(userdb.getId()));
            response.addCookie(cookie);

            responseEntity = new ResponseEntity(HttpStatus.OK);
        }
        else
        {
            responseEntity = new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }
        return responseEntity;
    }

    @PostMapping("/register")
    @ResponseBody
    public ResponseEntity postRegister(User user, HttpServletResponse response) {
        String email = user.getEmail();
        User userdb = userDAO.findByEmail(email);
        ResponseEntity responseEntity;

        if (userdb == null) {
            System.out.println("Register");
            User savedUser = userDAO.save(user);

            Cookie cookie = new Cookie("id", Long.toString(savedUser.getId()));
            response.addCookie(cookie);

            responseEntity = new ResponseEntity(HttpStatus.OK);
        } else {
            responseEntity = new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
        return responseEntity;
    }
}
