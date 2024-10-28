package com.stellargear.heladeria.Models.DTOs;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Transient;
import org.springframework.web.multipart.MultipartFile;


@Setter
@Getter
public class ProductDTO {
    
    private String product_id;
    private String name;
    private String description;
    private CategoryDTO category;
    private int price;
    @Transient
    private MultipartFile image;

    public ProductDTO() {};
}
