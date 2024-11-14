package com.stellargear.heladeria.Repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.stellargear.heladeria.Models.Entities.User;

public interface UserRepository extends MongoRepository<User, String>{

    @Query("{ 'username' : ?0 }")
    User searchByName(String requested_username);
    
    @Query("{ 'email' : ?0 }")
    User searchByEmail(String requested_email);

    @Query("{ 'user_id' : ?0 }")
    User searchById(String requested_id);
}
