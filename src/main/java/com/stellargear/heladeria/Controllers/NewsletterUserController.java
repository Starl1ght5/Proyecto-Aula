package com.stellargear.heladeria.Controllers;

import com.stellargear.heladeria.Models.DTOs.NewsletterUserDTO;
import com.stellargear.heladeria.Services.NewsletterUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequiredArgsConstructor
public class NewsletterUserController {

    private final NewsletterUserService newsletter_serv;


    @PostMapping(path = "/api/newsletter/register")
    public ResponseEntity<?> registerToNewsletter(@RequestBody String registered_email) {
        return newsletter_serv.addNewsletterUserByForm(registered_email);
    }

    @GetMapping(path = "/api/newsletter/listAll")
    public List<NewsletterUserDTO> listAllNewsletterUsers() {
        return newsletter_serv.listAll();
    }
}
