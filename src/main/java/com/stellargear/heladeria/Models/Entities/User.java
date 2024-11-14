package com.stellargear.heladeria.Models.Entities;

import org.springframework.data.annotation.Id;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Setter
@Getter
@Document(collection = "Users")
public class User {

    @Id
    private String user_id;
    private String username;
    private String password;
    private String email;
    private int user_type;
    private List<Product> user_cart;

    public User() {}

    @Override
    public String toString() {
        return "User{" +
                "user_id='" + user_id + '\'' +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", email='" + email + '\'' +
                ", user_type=" + user_type +
                ", user_cart=" + user_cart +
                '}';
    }
}
