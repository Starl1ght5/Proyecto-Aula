package com.stellargear.heladeria.Services;

import com.stellargear.heladeria.Models.DTOs.ProductDTO;
import com.stellargear.heladeria.Models.Entities.Product;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ProductService {
    
    ResponseEntity<?> addProduct(ProductDTO new_product);
    ResponseEntity<?> deleteProduct(String product_id);
    ResponseEntity<?> updateProduct(ProductDTO new_details);

    ProductDTO searchProductByName(String requested_name);
    ProductDTO searchProductById(String requested_id);

    List<ProductDTO> listAll();
    List<ProductDTO> listByCategory(String category_name);
    List<ProductDTO> listRandom();

    Product dtoToObject(ProductDTO requested_dto);
    ProductDTO objectToDto(Product requested_object);
    List<Product> dtoListToObject(List<ProductDTO> requested_list);
    List<ProductDTO> objectListToDto(List<Product> requested_list);
}
