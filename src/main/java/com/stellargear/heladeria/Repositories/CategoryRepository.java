package com.stellargear.heladeria.Repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.stellargear.heladeria.Models.Entities.Category;

public interface CategoryRepository extends MongoRepository<Category, String> {

    @Query("{ 'name' : ?0 }")
    Category searchByName(String name);
}