package com.example.moviesbackend;

import com.example.moviesbackend.dao.UserDAO;
import com.example.moviesbackend.model.UserModel;
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

    //Default get home page
    @GetMapping
    public String index() {
        return "index";
    }

    //Register html
    @RequestMapping(value = "/register")
    public String getRegister() {
        return "register";
    }

    //Bookmarks html
    @RequestMapping(value = "/bookmarks")
    public String redirectBookmarks() {
        return "bookmarks";
    }

    //User login
    @PostMapping("/login")
    @ResponseBody
    public ResponseEntity<UserModel> postLogin(UserModel userModel, HttpServletResponse response)
    {
        String email = userModel.getEmail();
        String pass = userModel.getPassword();
        UserModel userdb = userDAO.findByEmail(email);

        //User exists and password is correct, then login
        if(userdb != null && userdb.getPassword().equals(pass))
        {
            System.out.println("LogIn of user id: " + userdb.getId());

            //Write cookie with userID
            Cookie cookie = new Cookie("id", Long.toString(userdb.getId()));
            response.addCookie(cookie);

            return ResponseEntity.ok().body(userdb);
        }
        //else return error
        else
        {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PostMapping("/register")
    @ResponseBody
    public ResponseEntity postRegister(UserModel userModel, HttpServletResponse response)
    {
        String email = userModel.getEmail();
        UserModel userdb = userDAO.findByEmail(email);
        ResponseEntity responseEntity;

        //If email-user doesn't exist create user
        if (userdb == null)
        {
            System.out.println("Register");
            UserModel savedUserModel = userDAO.save(userModel);

            Cookie cookie = new Cookie("id", Long.toString(savedUserModel.getId()));
            response.addCookie(cookie);

            responseEntity = new ResponseEntity(HttpStatus.OK);
        }
        //else return error
        else
        {
            responseEntity = new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
        return responseEntity;
    }

    @RequestMapping(value = "/userbookmarks", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<String>> getBookmarks(@CookieValue(value = "id", defaultValue = "0") String sid)
    {
        //Read user cookie for userID
        int id = Integer.parseInt(sid);
        //If no cookie then no user is logged in so return error
        if(id == 0)
        {
            return ResponseEntity.badRequest().body(null);
        }
        else //Return user bookmarks list
        {
            Optional<UserModel> user = userDAO.findById(id);
            List<String> bookmarks = user.get().getBookmarks();

            return ResponseEntity.ok().body(bookmarks);
        }
    }

    @GetMapping(value = "/bookmark/{imdb}")
    public ResponseEntity<Boolean> getBookmark(@PathVariable(name="imdb") String imdb, @CookieValue(value = "id", defaultValue = "0") String sid)
    {
        //Get cookie to get userID
        int id = Integer.parseInt(sid);
        //If no cookie there is no user so return error
        if(id == 0)
        {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
        else //Get movie imdb code and search in user bookmarks list
        {
            Optional<UserModel> user = userDAO.findById(id);
            List<String> bookmarks = user.get().getBookmarks();
            for (String imdbCur : bookmarks)
            {
                if (imdbCur.equals(imdb))
                {
                    return ResponseEntity.ok().body(true);
                }
            }
            //If not found return false
            return ResponseEntity.ok().body(false);
        }
    }

    @PostMapping(value = "/bookmark/{imdb}")
    public ResponseEntity addBookmark(@PathVariable(name="imdb") String imdb, @CookieValue(value = "id", defaultValue = "0") String sid)
    {
        //Get cookie for userID
        int id = Integer.parseInt(sid);
        if(id == 0)
        {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
        else //add this imdb code to this user bookmarks list if does not already exist
        {
            Optional<UserModel> user = userDAO.findById(id);
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
        if (id != 0) //I userId found delete imdb bookmark if exists
        {
            Optional<UserModel> user = userDAO.findById(id);
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
    public ResponseEntity<UserModel> getUser(@CookieValue(value = "id", defaultValue = "0") String sid)
    {
        //Get cookie for userID
        int id = Integer.parseInt(sid);
        if (id == 0)
        {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        else //If found userID return the user info
        {
            Optional<UserModel> user = userDAO.findById(id);
            return ResponseEntity.ok().body(user.get());
        }
    }
}
