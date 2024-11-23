package com.stellargear.heladeria.Models.Entities;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Getter
@Setter
@Document(collection = "Products")
public class Product {

    @Id
    private String product_id;
    private String name;
    private String description;
    private Category category;
    private int price;
    private int quantity;

    public Product (){};

    public void increaseQuantity(int value) {
        this.quantity += value;
    }

    public void decreaseQuantity(int value) {
        this.quantity -= value;

        if (this.quantity <= 1) {
            this.quantity = 1;
        }
    }
}
