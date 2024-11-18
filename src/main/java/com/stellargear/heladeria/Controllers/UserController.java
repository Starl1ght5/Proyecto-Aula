package com.stellargear.heladeria.Controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.stellargear.heladeria.Models.DTOs.UserDTO;
import com.stellargear.heladeria.Services.UserService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@CrossOrigin
public class UserController {
    
    private final UserService user_serv;


    @PostMapping(path="/api/user/add")
    public ResponseEntity<?> addUser(@RequestBody UserDTO new_account_attempt) {
        return user_serv.addUser(new_account_attempt);
    }


    @PostMapping(path="/api/user/login")
    public ResponseEntity<?> login(@RequestBody UserDTO login_attempt) {
        UserDTO response = user_serv.login(login_attempt);
        int status = response.getUser_type();

        return switch (status) {
            case 1 -> new ResponseEntity<UserDTO>(response, HttpStatus.OK);
            case 2 -> new ResponseEntity<UserDTO>(response, HttpStatus.ACCEPTED);
            case 3 -> new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            default -> new ResponseEntity<>(HttpStatus.NOT_FOUND);
        };
    }


    @GetMapping(path="/api/user/listAll")
    public List<UserDTO> listAll() {
        return user_serv.listAll();
    }
}
