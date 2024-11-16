package com.stellargear.heladeria.Services.ServiceImplementations;

import java.util.List;
import java.util.Optional;

import com.stellargear.heladeria.Services.ImageService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.stellargear.heladeria.Models.DTOs.CategoryDTO;
import com.stellargear.heladeria.Repositories.CategoryRepository;
import com.stellargear.heladeria.Services.CategoryService;

import lombok.RequiredArgsConstructor;

import com.stellargear.heladeria.Models.Entities.Category;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@Service
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository category_repo;
    private final ImageService image_serv;


    /// Manipulation Methods
    @Override
    @Transactional(propagation = Propagation.REQUIRED)
    public ResponseEntity<?> addCategory (CategoryDTO new_category) {
        Category added_category = new Category();
        added_category.setName(new_category.getName());
        category_repo.save(added_category);
        image_serv.uploadCategoryImage(added_category.getCategory_id(), new_category.getImage());
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }


    @Override
    @Transactional(propagation = Propagation.REQUIRED)
    public void deleteCategory (String category_id) {
        category_repo.deleteById(category_id);
    }


    @Override
    @Transactional(propagation = Propagation.REQUIRED)
    public void updateCategory (String category_id, String new_name) {
        Category updated_category = new Category();
        updated_category.setCategory_id(category_id);
        updated_category.setName(new_name);
        category_repo.save(updated_category);
    }


    /// Search Methods 
    @Override
    public List<CategoryDTO> listAll() {
        return category_repo.findAll().stream()
            .map( category -> {
                CategoryDTO returned_dto = new CategoryDTO();
                returned_dto.setCategory_id(category.getCategory_id());
                returned_dto.setName(category.getName());
                return returned_dto;
            }).toList();
    }


    @Override
    public CategoryDTO searchByID(String requested_id) {
        Category db_object = category_repo.searchByID(requested_id);
        CategoryDTO returned_dto = new CategoryDTO();
        returned_dto.setCategory_id(db_object.getCategory_id());
        returned_dto.setName(db_object.getName());
        return returned_dto;
    }
    

    /// Utility Methods
    @Override
    public CategoryDTO objectToDto (Category requested_object) {
        CategoryDTO converted_dto = new CategoryDTO();
        converted_dto.setCategory_id(requested_object.getCategory_id());
        converted_dto.setName(requested_object.getName());
        return converted_dto;
    }

    @Override
    public Category dtoToObject (CategoryDTO requested_dto) {
        Category converted_object = new Category();
        converted_object.setCategory_id(requested_dto.getCategory_id());
        converted_object.setName(requested_dto.getName());
        return converted_object;
    }
}
