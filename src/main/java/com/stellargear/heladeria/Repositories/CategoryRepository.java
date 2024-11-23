package com.stellargear.heladeria.Repositories;

import com.stellargear.heladeria.Models.Entities.Category;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface CategoryRepository extends MongoRepository<Category, String> {

    @Query("{ 'category_id' : ?0 }")
    Category searchByID(String requested_id);
}