package com.stellargear.heladeria.Services;

import java.util.List;

import com.stellargear.heladeria.Models.DTOs.CategoryDTO;
import com.stellargear.heladeria.Models.Entities.Category;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;


public interface CategoryService {
    
    ResponseEntity<?> addCategory(CategoryDTO new_category);
    void deleteCategory(String category_id);
    void updateCategory(String category_id, String new_name);

    List<CategoryDTO> listAll();
    CategoryDTO searchByID(String requested_id);

    Category dtoToObject(CategoryDTO requested_dto);
    CategoryDTO objectToDto(Category requested_object);
}
