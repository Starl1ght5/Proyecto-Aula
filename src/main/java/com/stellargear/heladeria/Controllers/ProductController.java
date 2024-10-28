package com.stellargear.heladeria.Controllers;

import java.util.List;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.stellargear.heladeria.Models.DTOs.ProductDTO;
import com.stellargear.heladeria.Services.CategoryService;
import com.stellargear.heladeria.Services.ProductService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
public class ProductController {
    
    private final ProductService product_serv;


    @CrossOrigin
    @PostMapping(path="/api/product/add")
    public void addProduct (@RequestBody ProductDTO new_product) {
        product_serv.addProduct(new_product);
    }


    @CrossOrigin
    @PutMapping(path="/api/product/update")
    public void updateProduct(@RequestBody ProductDTO updated_product, @RequestBody String requested_id) {
        product_serv.updateProduct(requested_id, updated_product);
    }


    @CrossOrigin
    @DeleteMapping(path="/api/product/delete")
    public void deleteProduct (@RequestParam String product_id) {
        product_serv.deleteProduct(product_id);
    }


    ///Search Routes
    @CrossOrigin
    @GetMapping(path="/api/product/listAll")
    public List<ProductDTO> listAllProducts() {
        return product_serv.listAll();
    }

    @CrossOrigin
    @GetMapping(path="/api/product/listByCategory")
    public List<ProductDTO> listByCategory(@RequestParam String category_id) {
        return product_serv.listByCategory(category_id);
    }
}
