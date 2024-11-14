package com.stellargear.heladeria.Models.DTOs;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CartDTO {
    String requested_product;
    String user_id;
    int quantity;

    public CartDTO(){};
}
