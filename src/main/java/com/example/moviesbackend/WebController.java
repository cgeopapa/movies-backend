package com.example.moviesbackend;

import com.example.moviesbackend.dao.UserDAO;
import com.example.moviesbackend.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Optional;

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

    @RequestMapping(value = "/bookmarks")
    public String redirectBookmarks() {
        return "bookmarks";
    }

    @PostMapping("/login")
    @ResponseBody
    public ResponseEntity<User> postLogin(User user, HttpServletResponse response)
    {
        String email = user.getEmail();
        String pass = user.getPassword();
        User userdb = userDAO.findByEmail(email);

        if(userdb != null && userdb.getPassword().equals(pass))
        {
            System.out.println("LogIn of user id: " + userdb.getId());

            Cookie cookie = new Cookie("id", Long.toString(userdb.getId()));
            response.addCookie(cookie);

            return ResponseEntity.ok().body(userdb);
        }
        else
        {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PostMapping("/register")
    @ResponseBody
    public ResponseEntity postRegister(User user, HttpServletResponse response)
    {
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

    @RequestMapping(value = "/userbookmarks", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<String>> getBookmarks(@CookieValue(value = "id", defaultValue = "0") String sid)
    {
        int id = Integer.parseInt(sid);
        if(id == 0)
        {
            return ResponseEntity.badRequest().body(null);
        }
        else
        {
            Optional<User> user = userDAO.findById(id);
            List<String> bookmarks = user.get().getBookmarks();

            return ResponseEntity.ok().body(bookmarks);
        }
    }

    @GetMapping(value = "/bookmark/{imdb}")
    public ResponseEntity<Boolean> getBookmark(@PathVariable(name="imdb") String imdb, @CookieValue(value = "id", defaultValue = "0") String sid)
    {
        int id = Integer.parseInt(sid);
        if(id == 0)
        {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
        else
        {
            Optional<User> user = userDAO.findById(id);
            List<String> bookmarks = user.get().getBookmarks();
            for (String imdbCur : bookmarks)
            {
                if (imdbCur.equals(imdb))
                {
                    return ResponseEntity.ok().body(true);
                }
            }
            return ResponseEntity.ok().body(false);
        }
    }

    @PostMapping(value = "/bookmark/{imdb}")
    public ResponseEntity addBookmark(@PathVariable(name="imdb") String imdb, @CookieValue(value = "id", defaultValue = "0") String sid)
    {
        int id = Integer.parseInt(sid);
        if(id == 0)
        {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
        else
        {
            Optional<User> user = userDAO.findById(id);
            List<String> bookmarks = user.get().getBookmarks();
            for (String imdbCur : bookmarks)
            {
                if (imdbCur.equals(imdb))
                {
                    return new ResponseEntity(HttpStatus.OK);
                }
            }
            bookmarks.add(imdb);
            userDAO.save(user.get());
            return new ResponseEntity(HttpStatus.OK);
        }
    }

    @DeleteMapping(value = "/bookmark/{imdb}")
    public ResponseEntity removeBookmark(@PathVariable(name="imdb") String imdb, @CookieValue(value = "id", defaultValue = "0") String sid)
    {
        int id = Integer.parseInt(sid);
        if (id != 0)
        {
            Optional<User> user = userDAO.findById(id);
            List<String> bookmarks = user.get().getBookmarks();
            for (String imdbCur : bookmarks)
            {
                if (imdbCur.equals(imdb))
                {
                    bookmarks.remove(imdbCur);
                    userDAO.save(user.get());
                    return new ResponseEntity(HttpStatus.OK);
                }
            }
        }
        return new ResponseEntity(HttpStatus.BAD_REQUEST);
    }

    @GetMapping(value = "/user")
    public ResponseEntity<User> getUser(@CookieValue(value = "id", defaultValue = "0") String sid)
    {
        int id = Integer.parseInt(sid);
        if (id == 0)
        {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        else
        {
            Optional<User> user = userDAO.findById(id);
            return ResponseEntity.ok().body(user.get());
        }
    }
}
