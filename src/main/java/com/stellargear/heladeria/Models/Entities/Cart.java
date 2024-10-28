package com.stellargear.heladeria.Models.Entities;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;

import java.util.List;

@Setter
@Getter
public class Cart {

    @Id
    private String cart_id;
    private User assosiated_user;
    private List<Product> cart_contents;

    public Cart () {}
}
