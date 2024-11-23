package com.stellargear.heladeria.Controllers;

import com.stellargear.heladeria.Models.DTOs.ProductDTO;
import com.stellargear.heladeria.Services.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@CrossOrigin
public class ProductController {
    
    private final ProductService product_serv;


    @PostMapping(path = "/api/product/add")
    public ResponseEntity<?> addProduct (@ModelAttribute ProductDTO new_product) {
        return product_serv.addProduct(new_product);
    }

    @PutMapping(path = "/api/product/update")
    public ResponseEntity<?> updateProduct(@ModelAttribute ProductDTO updated_product) {
        return product_serv.updateProduct(updated_product);
    }

    @DeleteMapping(path = "/api/product/delete/{requested_id}")
    public ResponseEntity<?> deleteProduct (@PathVariable String requested_id) {
        return product_serv.deleteProduct(requested_id);
    }


    /// Search Routes
    @GetMapping(path = "/api/product/search/{name}")
    public ProductDTO searchProductByName(@PathVariable String name) {
        return product_serv.searchProductByName(name);
    }


    /// List Routes
    @GetMapping(path = "/api/product/listAll")
    public List<ProductDTO> listAllProducts() {
        return product_serv.listAll();
    }


    @GetMapping(path = "/api/product/category/search/{requested_id}")
    public List<ProductDTO> listByCategory(@PathVariable String requested_id) {
        return product_serv.listByCategory(requested_id);
    }

    @GetMapping(path = "/api/product/search/random")
    public List<ProductDTO> listRandom() {
        return product_serv.listRandom();
    }
}
