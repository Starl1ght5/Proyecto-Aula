package com.stellargear.heladeria.Controllers;

import com.stellargear.heladeria.Models.DTOs.CategoryDTO;
import com.stellargear.heladeria.Services.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@CrossOrigin
public class CategoryController {
    
    private final CategoryService category_serv;


    /// Manipulation Routes
    @PostMapping(path = "/api/category/add")
    public ResponseEntity<?> addCategory(@ModelAttribute CategoryDTO new_category) {
        return category_serv.addCategory(new_category);
    }

    @DeleteMapping(path = "/api/category/delete/{requested_id}")
    public ResponseEntity<?> deleteCategory(@PathVariable String requested_id) {
        return category_serv.deleteCategory(requested_id);
    }

    @PutMapping(path = "/api/category/update")
    public ResponseEntity<?> updateCategory(@ModelAttribute CategoryDTO new_details) {
        return category_serv.updateCategory(new_details);
    }


    /// Search Routes
    @GetMapping(path = "/api/category/listAll")
    public List<CategoryDTO> listAllCategory() {
        return category_serv.listAll();
    }

}
