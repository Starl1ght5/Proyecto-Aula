package com.stellargear.heladeria.Controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.stellargear.heladeria.Models.DTOs.CategoryDTO;
import com.stellargear.heladeria.Services.CategoryService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@RestController
@CrossOrigin
public class CategoryController {
    
    private final CategoryService category_serv;


    /// Manipulation Routes
    @PostMapping(path="/api/category/add")
    public ResponseEntity<?> addCategory(@ModelAttribute CategoryDTO new_category) {
        return category_serv.addCategory(new_category);
    }


    @DeleteMapping(path="/api/category/delete")
    public void deleteCategory(@RequestParam String category_id) {
        category_serv.deleteCategory(category_id);
    }


    /// TODO Hacer esto cuando implemente lo del servicio
    @PutMapping(path="/api/category/update")
    public void updateCategory() {
        
    }


    /// Search Routes
    @GetMapping(path="/api/category/listAll")
    public List<CategoryDTO> listAllCategory() {
        return category_serv.listAll();
    }

}
