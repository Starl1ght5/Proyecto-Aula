package com.stellargear.heladeria.Models.DTOs;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDTO {

    private String user_id;
    private String username;
    private String password;
    private String email;
    private int user_type;

    public UserDTO() {}
}
