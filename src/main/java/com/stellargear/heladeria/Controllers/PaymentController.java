package com.stellargear.heladeria.Controllers;

import com.stellargear.heladeria.Models.DTOs.PaymentDTO;
import com.stellargear.heladeria.Services.PaymentService;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin
public class PaymentController {

    private final PaymentService payment_serv;


    @PostMapping(path = "/api/payments/payment-complete")
    public ResponseEntity<?> completePaymentIntent(@RequestBody PaymentDTO payment_info){
        payment_serv.saveCompletePayment(payment_info);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }
}