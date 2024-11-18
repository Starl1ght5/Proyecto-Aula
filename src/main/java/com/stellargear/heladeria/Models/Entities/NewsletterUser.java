package com.stellargear.heladeria.Models.Entities;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Setter
@Getter
@Document(collection = "Newsletter Users")
public class NewsletterUser {

    @Id
    private String newsletter_user_id;
    private User registered_user;
    private String registered_email;

    public NewsletterUser() {}
}
