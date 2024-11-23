package com.stellargear.heladeria.Services.ServiceImplementations;

import com.stellargear.heladeria.Models.DTOs.CategoryDTO;
import com.stellargear.heladeria.Models.Entities.Category;
import com.stellargear.heladeria.Repositories.CategoryRepository;
import com.stellargear.heladeria.Services.CategoryService;
import com.stellargear.heladeria.Services.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

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
        return new ResponseEntity<>(HttpStatus.OK);
    }


    @Override
    @Transactional(propagation = Propagation.REQUIRED)
    public ResponseEntity<?> deleteCategory (String category_id) {
        category_repo.deleteById(category_id);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    @Override
    @Transactional(propagation = Propagation.REQUIRED)
    public ResponseEntity<?> updateCategory (CategoryDTO new_details) {
        Category updated_category = new Category();
        updated_category.setCategory_id(new_details.getCategory_id());
        updated_category.setName(new_details.getName());
        category_repo.save(updated_category);
        image_serv.uploadCategoryImage(updated_category.getCategory_id(), new_details.getImage());
        return new ResponseEntity<>(HttpStatus.OK);
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
