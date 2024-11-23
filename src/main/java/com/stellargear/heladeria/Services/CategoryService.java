package com.stellargear.heladeria.Services;

import com.stellargear.heladeria.Models.DTOs.CategoryDTO;
import com.stellargear.heladeria.Models.Entities.Category;
import org.springframework.http.ResponseEntity;

import java.util.List;


public interface CategoryService {
    
    ResponseEntity<?> addCategory(CategoryDTO new_category);
    ResponseEntity<?> deleteCategory(String category_id);
    ResponseEntity<?> updateCategory(CategoryDTO new_details);

    List<CategoryDTO> listAll();
    CategoryDTO searchByID(String requested_id);

    Category dtoToObject(CategoryDTO requested_dto);
    CategoryDTO objectToDto(Category requested_object);
}
