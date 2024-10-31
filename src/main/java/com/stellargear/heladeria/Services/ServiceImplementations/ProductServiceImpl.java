package com.stellargear.heladeria.Services.ServiceImplementations;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.stellargear.heladeria.Models.DTOs.ProductDTO;
import com.stellargear.heladeria.Models.Entities.Category;
import com.stellargear.heladeria.Models.Entities.Product;
import com.stellargear.heladeria.Repositories.ProductRepository;
import com.stellargear.heladeria.Services.CategoryService;
import com.stellargear.heladeria.Services.ImageService;
import com.stellargear.heladeria.Services.ProductService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository product_repo;
    private final CategoryService category_serv;
    private final ImageService image_serv;


    /// Manipulation Methods
    @Override
    @Transactional(propagation = Propagation.REQUIRED)
    public void addProduct(ProductDTO new_product) {
        Product added_product = new Product();
        added_product.setName(new_product.getName());
        added_product.setDescription(new_product.getDescription());
        added_product.setPrice(new_product.getPrice());
        added_product.setCategory(category_serv.dtoToObject(category_serv.searchByID(new_product.getCategory_id())));
        product_repo.save(added_product);
        image_serv.uploadImage(added_product.getProduct_id(), new_product.getImage());
    }


    @Override
    @Transactional(propagation = Propagation.REQUIRED)
    public void updateProduct(String requested_id, ProductDTO new_details) {
        Optional<Product> db_product = product_repo.findById(requested_id);

        if (db_product.isPresent()) {
            Product updated_product = new Product();
            updated_product.setProduct_id(db_product.get().getProduct_id());
            updated_product.setName(new_details.getName());
            updated_product.setDescription(new_details.getDescription());
            updated_product.setPrice(new_details.getPrice());
            updated_product.setCategory(category_serv.dtoToObject(new_details.getCategory()));
            product_repo.save(updated_product);
            image_serv.uploadImage(updated_product.getProduct_id(), new_details.getImage());
        }
    }


    @Override
    @Transactional(propagation = Propagation.REQUIRED)
    public void deleteProduct(String product_id) {
        product_repo.deleteById(product_id);
    }


    /// Search Methods
    @Override
    public List<ProductDTO> listAll() {
        return product_repo.findAll().stream()
            .map( product -> {
                ProductDTO returned_dto = new ProductDTO();
                returned_dto.setProduct_id(product.getProduct_id());
                returned_dto.setName(product.getName());
                returned_dto.setDescription(product.getDescription());
                returned_dto.setPrice(product.getPrice());
                returned_dto.setCategory(category_serv.objectToDto(product.getCategory()));
                return returned_dto;
            }).toList();
    }

    @Override
    public List<ProductDTO> listByCategory(String category_id) {
        Category searched_category = category_serv.dtoToObject(category_serv.searchByID(category_id));

        return product_repo.searchAllByCategory(searched_category).stream()
            .map( product -> {
                ProductDTO returned_dto = new ProductDTO();
                returned_dto.setProduct_id(product.getProduct_id());
                returned_dto.setName(product.getName());
                returned_dto.setDescription(product.getDescription());
                returned_dto.setPrice(product.getPrice());
                returned_dto.setCategory(category_serv.objectToDto(product.getCategory()));
                return returned_dto;
            }).toList();
    }


    /// Utility Methods
    @Override
    public Product dtoToObject(ProductDTO requested_dto) {
        Product requested_object = new Product();
        requested_object.setProduct_id(requested_dto.getProduct_id());
        requested_object.setName(requested_dto.getName());
        requested_object.setCategory(category_serv.dtoToObject(requested_dto.getCategory()));
        requested_object.setPrice(requested_dto.getPrice());
        requested_object.setDescription(requested_dto.getDescription());
        return requested_object;
    }


    @Override
    public ProductDTO objectToDto(Product requested_object) {
        ProductDTO requested_dto = new ProductDTO();
        requested_dto.setProduct_id(requested_object.getProduct_id());
        requested_dto.setName(requested_object.getName());
        requested_dto.setCategory(category_serv.objectToDto((requested_object.getCategory())));
        requested_dto.setPrice(requested_object.getPrice());
        requested_dto.setDescription(requested_object.getDescription());
        return requested_dto;
    }
}
