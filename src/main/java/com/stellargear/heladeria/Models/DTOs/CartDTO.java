package com.stellargear.heladeria.Models.DTOs;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class CartDTO {

    private String cart_id;
    private UserDTO assosiated_user;
    private List<ProductDTO> cart_contents;

    public CartDTO () {}
}
