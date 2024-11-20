package com.stellargear.heladeria.Services.ServiceImplementations;

import com.stellargear.heladeria.Models.DTOs.NewsletterUserDTO;
import com.stellargear.heladeria.Models.DTOs.UserDTO;
import com.stellargear.heladeria.Models.Entities.NewsletterUser;
import com.stellargear.heladeria.Models.Entities.User;
import com.stellargear.heladeria.Repositories.NewsletterUserRepository;
import com.stellargear.heladeria.Services.NewsletterUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
@RequiredArgsConstructor
public class NewsletterUserServiceImpl implements NewsletterUserService {

    private final NewsletterUserRepository newsletter_repo;


    @Override
    @Transactional(propagation = Propagation.REQUIRED)
    public void addNewsletterUserByRegister(User subscribing_user) {
        NewsletterUser exist = newsletter_repo.searchByEmail(subscribing_user.getEmail());

        if (exist == null) {
            NewsletterUser new_subscriber = new NewsletterUser();
            new_subscriber.setRegistered_user(subscribing_user);
            new_subscriber.setRegistered_email(subscribing_user.getEmail());
            newsletter_repo.save(new_subscriber);
        }

    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED)
    public ResponseEntity<?> addNewsletterUserByForm(String added_email) {
        NewsletterUser exist = newsletter_repo.searchByEmail(added_email);

        if (exist == null) {
            NewsletterUser new_subscriber = new NewsletterUser();
            new_subscriber.setRegistered_email(added_email);
            newsletter_repo.save(new_subscriber);
            return new ResponseEntity<>(HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }


    @Override
    public List<NewsletterUserDTO> listAllUsers() {
        return newsletter_repo.findAll().stream()
                .map(newsletter_user -> {
                    NewsletterUserDTO returned_newsletter_user = new NewsletterUserDTO();
                    returned_newsletter_user.setNewsletter_user_id(newsletter_user.getNewsletter_user_id());
                    returned_newsletter_user.setRegistered_user(userObjectToDto(newsletter_user.getRegistered_user()));
                    returned_newsletter_user.setRegistered_email(newsletter_user.getRegistered_email());
                    return returned_newsletter_user;
                }).toList();
    }

    @Override
    public UserDTO userObjectToDto(User requested_object) {
        UserDTO requested_dto = new UserDTO();
        requested_dto.setUser_id(requested_object.getUser_id());
        requested_dto.setUsername(requested_object.getUsername());
        requested_dto.setPassword(requested_object.getPassword());
        requested_dto.setEmail(requested_object.getEmail());
        requested_dto.setUser_type(requested_object.getUser_type());
        return requested_dto;
    }
}
