package com.stellargear.heladeria.Services;

import java.util.List;

import com.stellargear.heladeria.Models.Entities.Product;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import com.stellargear.heladeria.Models.DTOs.ProductDTO;

public interface ProductService {
    
    ResponseEntity<?> addProduct(ProductDTO new_product);
    void deleteProduct(String product_id);
    void updateProduct(String requested_id, ProductDTO new_details);

    ProductDTO searchProductByName(String requested_name);
    ProductDTO searchProductById(String requested_id);

    List<ProductDTO> listAll();
    List<ProductDTO> listByCategory(String category_name);

    Product dtoToObject(ProductDTO requested_dto);
    ProductDTO objectToDto(Product requested_object);
    List<Product> dtoListToObject(List<ProductDTO> requested_list);
    List<ProductDTO> objectListToDto(List<Product> requested_list);
}
