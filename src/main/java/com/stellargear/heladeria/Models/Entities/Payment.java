package com.stellargear.heladeria.Models.Entities;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Setter
@Getter
@Document(collection = "Payments")
public class Payment {

    @Id
    private String payment_id;
    private User client;
    private int amount_paid;
}