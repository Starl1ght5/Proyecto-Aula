package com.stellargear.heladeria.Repositories;

import com.stellargear.heladeria.Models.Entities.NewsletterUser;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface NewsletterUserRepository extends MongoRepository<NewsletterUser, String> {

    @Query("{ 'registered_email' : ?0 }")
    NewsletterUser searchByEmail(String requested_email);
}
