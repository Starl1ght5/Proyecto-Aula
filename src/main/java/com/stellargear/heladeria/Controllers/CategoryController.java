package com.stellargear.heladeria.Controllers;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.stellargear.heladeria.Models.DTOs.CategoryDTO;
import com.stellargear.heladeria.Services.CategoryService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
public class CategoryController {
    
    private final CategoryService category_serv;

    @CrossOrigin
    @GetMapping(path="/api/test/test")
    public String test() {
        return "XD";
    }

    /// Manipulation Routes
    @CrossOrigin
    @PostMapping(path="/api/category/add")
    public void addCategory(@RequestParam String category_name) {
        category_serv.addCategory(category_name);
    }

    @CrossOrigin
    @DeleteMapping(path="/api/category/delete")
    public void deleteCategory(@RequestParam String category_id) {
        category_serv.deleteCategory(category_id);
    }

    /// TODO Hacer esto cuando implemente lo del servicio
    @CrossOrigin
    @PutMapping(path="/api/category/update")
    public void updateCategory() {
        
    }


    /// Search Routes
    @CrossOrigin
    @GetMapping(path="/api/category/listAll")
    public List<CategoryDTO> listAllCategory() {
        return category_serv.listAll();
    }

}
