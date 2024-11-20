package com.stellargear.heladeria.Services.ServiceImplementations;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<?> addProduct(ProductDTO new_product) {
        Product added_product = new Product();
        added_product.setName(new_product.getName());
        added_product.setDescription(new_product.getDescription());
        added_product.setPrice(new_product.getPrice());
        added_product.setCategory(category_serv.dtoToObject(category_serv.searchByID(new_product.getCategory_id())));
        product_repo.save(added_product);
        image_serv.uploadProductImage(added_product.getProduct_id(), new_product.getImage());
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }


    @Override
    @Transactional(propagation = Propagation.REQUIRED)
    public void updateProduct(String requested_id, ProductDTO new_details) {
        Product db_product = product_repo.searchById(requested_id);

        if (db_product != null) {
            Product updated_product = new Product();
            updated_product.setProduct_id(db_product.getProduct_id());
            updated_product.setName(new_details.getName());
            updated_product.setDescription(new_details.getDescription());
            updated_product.setPrice(new_details.getPrice());
            updated_product.setCategory(category_serv.dtoToObject(new_details.getCategory()));
            product_repo.save(updated_product);
            image_serv.uploadProductImage(updated_product.getProduct_id(), new_details.getImage());
        }
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED)
    public void deleteProduct(String product_id) {
        product_repo.deleteById(product_id);
    }


    /// Search Methods
    @Override
    public ProductDTO searchProductByName(String requested_name) {
        return objectToDto(product_repo.searchByName(requested_name));
    }

    @Override
    public ProductDTO searchProductById(String requested_id) {
        return objectToDto(product_repo.searchById(requested_id));
    }


    /// List Methods
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

    @Override
    public List<ProductDTO> listRandom() {
        List<Product> db_list = product_repo.findAll();
        List<ProductDTO> returned_list = new ArrayList<>();
        Random random = new Random();
        
        for (int i = 0; i < 5; i++) {
            int random_index = random.nextInt(db_list.size());

            ProductDTO db_product = objectToDto(db_list.get(random_index));
            db_list.remove(random_index);
            returned_list.add(db_product);
        }

        return returned_list;
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
        requested_object.setQuantity(requested_dto.getQuantity());
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
        requested_dto.setQuantity(requested_object.getQuantity());
        return requested_dto;
    }

    @Override
    public List<Product> dtoListToObject(List<ProductDTO> requested_list) {
        List<Product> returned_list = new ArrayList<>();

        for (ProductDTO productDTO : requested_list) {
            returned_list.add(dtoToObject(productDTO));
        }

        return returned_list;
    }

    @Override
    public List<ProductDTO> objectListToDto(List<Product> requested_list) {
        List<ProductDTO> returned_list = new ArrayList<>();

        for (Product product : requested_list) {
            returned_list.add(objectToDto(product));
        }

        return returned_list;
    }
}
