package com.stellargear.heladeria.Models.DTOs;

import lombok.Getter;
import lombok.Setter;

import java.util.List;


@Setter
@Getter
public class CartDTO {
    String requested_product;
    String user_id;
    int quantity;
    List<ProductDTO> cart_contents;
    int total_cart_price;

    public CartDTO(){};

}


