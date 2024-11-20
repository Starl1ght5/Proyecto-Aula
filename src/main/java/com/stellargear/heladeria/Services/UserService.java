package com.stellargear.heladeria.Services;

import java.util.List;

import com.stellargear.heladeria.Models.DTOs.UserDTO;
import com.stellargear.heladeria.Models.Entities.User;
import org.springframework.http.ResponseEntity;

public interface UserService {
    
    ResponseEntity<?> addUser(UserDTO requested_new_user);
    void updateUserCart(User updated_cart);

    UserDTO login(UserDTO login_attempt);

    boolean isUsernameTaken(String requested_username);
    boolean isEmailTaken(String requested_email);

    User searchUserById(String requested_id);

    List<UserDTO> listAll();

    User dtoToObject(UserDTO requested_dto);
    UserDTO objectToDto(User requested_object);
    void clearUserCart(User user_to_clear);
    List<User> dtoListToObject(List<UserDTO> requested_list);
    List<UserDTO> objectListToDto(List<User> requested_list);
}
