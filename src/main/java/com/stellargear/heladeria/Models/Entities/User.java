package com.stellargear.heladeria.Models.Entities;

import org.springframework.data.annotation.Id;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class User {

    @Id
    private String user_id;
    private String username;
    private String password;
    private String email;
    private int user_type;

    public User() {}
}
