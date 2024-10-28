package com.stellargear.heladeria.Models.Entities;

import org.springframework.data.annotation.Id;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Transient;
import org.springframework.web.multipart.MultipartFile;


@Getter
@Setter
public class Product {

    @Id
    private String product_id;
    private String name;
    private String description;
    private Category category;
    private int price;
    @Transient
    private MultipartFile image;

    public Product (){};
}
