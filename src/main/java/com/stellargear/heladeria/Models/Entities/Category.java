package com.stellargear.heladeria.Models.Entities;

import org.springframework.data.annotation.Id;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document(collection = "Categories")
public class Category {
    
    @Id
    private String category_id;
    private String name;

    public Category() {};
}