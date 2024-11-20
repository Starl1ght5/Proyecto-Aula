package com.stellargear.heladeria.Services;

import com.stellargear.heladeria.Models.DTOs.PaymentDTO;
import com.stellargear.heladeria.Models.Entities.Payment;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import org.springframework.http.ResponseEntity;

public interface PaymentService {

    ResponseEntity<?> saveCompletePayment(PaymentDTO payment_info);
    Payment dtoToObject(PaymentDTO requested_dto);
}
