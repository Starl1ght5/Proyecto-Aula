package com.stellargear.heladeria.Services;

import com.stellargear.heladeria.Models.DTOs.NewsletterUserDTO;
import com.stellargear.heladeria.Models.Entities.NewsletterUser;
import com.stellargear.heladeria.Models.Entities.User;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface NewsletterUserService {

    void addNewsletterUserByRegister(User subscribing_user);
    ResponseEntity<?> addNewsletterUserByForm(String added_email);

    List<NewsletterUserDTO> listAllUsers();
}
