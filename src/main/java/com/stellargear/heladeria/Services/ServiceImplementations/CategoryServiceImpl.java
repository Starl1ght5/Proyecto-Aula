package com.stellargear.heladeria.Services.ServiceImplementations;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.stellargear.heladeria.Models.DTOs.CategoryDTO;
import com.stellargear.heladeria.Repositories.CategoryRepository;
import com.stellargear.heladeria.Services.CategoryService;

import lombok.RequiredArgsConstructor;

import com.stellargear.heladeria.Models.Entities.Category;

@RequiredArgsConstructor
@Service
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository category_repo;


    /// Manipulation Methods
    @Override
    @Transactional(propagation = Propagation.REQUIRED)
    public void addCategory (String category_name) {
        Category added_category = new Category();
        added_category.setName(category_name);
        category_repo.save(added_category);
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
        Optional<Category> db_object = category_repo.findById(requested_id);
        CategoryDTO returned_dto = new CategoryDTO();
        returned_dto.setCategory_id(db_object.get().getCategory_id());
        returned_dto.setName(db_object.get().getName());
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
