package com.stellargear.heladeria.Models.Entities;

import org.springframework.data.annotation.Id;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Category {
    
    @Id
    private String category_id;
    private String name;

    public Category() {};
}