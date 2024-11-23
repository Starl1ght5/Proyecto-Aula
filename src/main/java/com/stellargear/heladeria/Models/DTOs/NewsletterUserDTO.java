package com.stellargear.heladeria.Models.DTOs;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class NewsletterUserDTO {

    private String newsletter_user_id;
    private UserDTO registered_user;
    private String registered_email;

    public NewsletterUserDTO() {}
}
