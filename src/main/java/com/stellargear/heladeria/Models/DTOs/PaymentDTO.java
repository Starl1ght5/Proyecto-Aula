package com.stellargear.heladeria.Models.DTOs;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaymentDTO {

    private String payment_id;
    private UserDTO client;
    private int amount_paid;
}
