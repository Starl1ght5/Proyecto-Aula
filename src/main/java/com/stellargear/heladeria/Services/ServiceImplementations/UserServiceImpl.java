package com.stellargear.heladeria.Services.ServiceImplementations;

import java.util.ArrayList;
import java.util.List;

import com.stellargear.heladeria.Models.Entities.Product;
import com.stellargear.heladeria.Services.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.stellargear.heladeria.Models.DTOs.UserDTO;
import com.stellargear.heladeria.Models.Entities.User;
import com.stellargear.heladeria.Repositories.UserRepository;
import com.stellargear.heladeria.Services.UserService;

import lombok.RequiredArgsConstructor;


@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService{

    private final UserRepository user_repo;
    private final ProductService product_serv;
    ///private final PasswordEncoder password_encoder;


   /// TODO terminar de implementar la encriptacion de contraseñas
   /// TODO implementar mejor el manejo de errores y exepciones
    @Override
    @Transactional(propagation = Propagation.REQUIRED)
    public int addUser(UserDTO requested_new_user) {
        
        boolean is_name_taken = isUsernameTaken(requested_new_user.getUsername());
        boolean is_email_taken = isEmailTaken(requested_new_user.getEmail());

        if (!is_name_taken && !is_email_taken) {
            User new_user = new User();
            new_user.setUsername(requested_new_user.getUsername());
            new_user.setEmail(requested_new_user.getEmail());
            new_user.setPassword(requested_new_user.getPassword());
            new_user.setUser_type(1);
            new_user.setUser_cart(new ArrayList<Product>());
            user_repo.save(new_user);
            return 1;
        } else if (is_email_taken) {
            return 2;
        } else {
            return 3;
        }
    }

    @Override
    @Transactional
    public void updateUserCart(User updated_cart) {
        System.out.println(updated_cart);
        user_repo.save(updated_cart);
    }

    @Override
    public UserDTO login(UserDTO login_attempt) {
        User requested_user = user_repo.searchByName(login_attempt.getUsername());

        if (requested_user != null) {
            boolean correct_password = requested_user.getPassword().equals(login_attempt.getPassword());
            UserDTO response = objectToDto(requested_user);

            if (correct_password) {
                return response;
            } else {
                UserDTO empty = new UserDTO();
                empty.setUser_type(3);
                return empty;
            }
        } else {
            return null;
        }
    }
    /// 1 es iniciar como usuario
    /// 2 es iniciar como admin
    /// 3 es contrasela incorrecta
    /// default es usuario no encontrado

    /// Helper Methods
    @Override
    public boolean isUsernameTaken(String requested_username) {
        return user_repo.searchByName(requested_username) != null;
    }
    
    @Override
    public boolean isEmailTaken(String requested_email) {
        return user_repo.searchByEmail(requested_email) != null;
    }


    /// Search Methods
    @Override
    public User searchUserById(String requested_user_id) {
        return user_repo.searchById(requested_user_id);
    }


    /// List Methods
    @Override
    public List<UserDTO> listAll() {
        return user_repo.findAll().stream()
            .map( user -> {
                UserDTO returned_dto = new UserDTO();
                returned_dto.setUsername(user.getUsername());
                returned_dto.setEmail(user.getEmail());
                returned_dto.setPassword(user.getPassword());
                returned_dto.setUser_type(user.getUser_type());
                returned_dto.setUser_id(user.getUser_id());
                return returned_dto;
            }).toList();
    }


    /// Utility Methods
    @Override
    public User dtoToObject(UserDTO requested_dto) {
        User requested_object = new User();
        requested_object.setUser_id(requested_dto.getUser_id());
        requested_object.setUsername(requested_dto.getUsername());
        requested_object.setPassword(requested_dto.getPassword());
        requested_object.setEmail(requested_dto.getEmail());
        requested_object.setUser_type(requested_dto.getUser_type());
        requested_object.setUser_cart(product_serv.dtoListToObject(requested_dto.getUser_cart()));
        return requested_object;
    }

    @Override
    public UserDTO objectToDto(User requested_object) {
        UserDTO requested_dto = new UserDTO();
        requested_dto.setUser_id(requested_object.getUser_id());
        requested_dto.setUsername(requested_object.getUsername());
        requested_dto.setPassword(requested_object.getPassword());
        requested_dto.setEmail(requested_object.getEmail());
        requested_dto.setUser_type(requested_object.getUser_type());
        requested_dto.setUser_cart(product_serv.objectListToDto(requested_object.getUser_cart()));
        return requested_dto;
    }

    @Override
    public List<User> dtoListToObject(List<UserDTO> requested_list) {
        List<User> returned_list = new ArrayList<>();

        for (UserDTO userDTO : requested_list) {
            returned_list.add(dtoToObject(userDTO));
        }

        return returned_list;
    }

    @Override
    public List<UserDTO> objectListToDto(List<User> requested_list) {
        List<UserDTO> returned_list = new ArrayList<>();

        for (User user : requested_list) {
            returned_list.add(objectToDto(user));
        }

        return returned_list;
    }
}