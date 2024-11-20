package com.stellargear.heladeria.Models.DTOs;


import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class PaymentDTO {

    private String payment_id;
    private UserDTO client;
    private int amount_paid;
    private String currency;
    private List<ProductDTO> items_brought;
}
