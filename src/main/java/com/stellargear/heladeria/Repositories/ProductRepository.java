package com.stellargear.heladeria.Repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.stellargear.heladeria.Models.Entities.Category;
import com.stellargear.heladeria.Models.Entities.Product;

public interface ProductRepository extends MongoRepository<Product, String> {
    
    @Query("{ 'category' : ?0 }")
    List<Product> searchAllByCategory(Category category);
}
