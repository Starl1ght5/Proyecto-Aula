package com.stellargear.heladeria.Repositories;

import com.stellargear.heladeria.Models.Entities.Category;
import com.stellargear.heladeria.Models.Entities.Product;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface ProductRepository extends MongoRepository<Product, String> {
    
    @Query("{ 'category' : ?0 }")
    List<Product> searchAllByCategory(Category requested_category);

    @Query("{ 'name' : ?0 }")
    Product searchByName(String requested_name);

    @Query("{ 'product_id' : ?0 }")
    Product searchById(String requested_id);
}
