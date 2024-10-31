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
        int response = user_serv.addUser(new_account_attempt);

        return switch (response) {
            case 1 -> new ResponseEntity<>(HttpStatus.OK);
            case 2 -> new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            case 3 -> new ResponseEntity<>(HttpStatus.NOT_FOUND);
            default -> new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        };
    }


    @PostMapping(path="/api/user/login")
    public ResponseEntity<?> login(@RequestBody UserDTO login_attempt) {
        int response = user_serv.login(login_attempt);

        return switch (response) {
            case 1 -> new ResponseEntity<>(HttpStatus.OK);
            case 2 -> new ResponseEntity<>(HttpStatus.ACCEPTED);
            case 3 -> new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            case 4 -> new ResponseEntity<>(HttpStatus.NOT_FOUND);
            default -> new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        };
    }


    @GetMapping(path="/api/user/listAll")
    public List<UserDTO> listAll() {
        return user_serv.listAll();
    }
}
