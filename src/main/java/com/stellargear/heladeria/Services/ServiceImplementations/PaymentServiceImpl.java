package com.stellargear.heladeria.Services.ServiceImplementations;

import com.stellargear.heladeria.Models.DTOs.PaymentDTO;
import com.stellargear.heladeria.Models.Entities.Payment;
import com.stellargear.heladeria.Repositories.PaymentRepository;
import com.stellargear.heladeria.Services.PaymentService;
import com.stellargear.heladeria.Services.ProductService;
import com.stellargear.heladeria.Services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;


@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository payment_repo;
    private final UserService user_serv;
    private final ProductService product_serv;


    @Override
    @Transactional(propagation = Propagation.REQUIRED)
    public ResponseEntity<?> saveCompletePayment(PaymentDTO payment_info) {
        user_serv.clearUserCart(user_serv.dtoToObject(payment_info.getClient()));
        payment_repo.save(dtoToObject(payment_info));
        return new ResponseEntity<>(HttpStatus.OK);
    }


    @Override
    public Payment dtoToObject(PaymentDTO requested_dto) {
        Payment returned_object = new Payment();
        returned_object.setAmount_paid(requested_dto.getAmount_paid());
        returned_object.setCurrency(requested_dto.getCurrency());
        returned_object.setItems_brought(product_serv.dtoListToObject(requested_dto.getItems_brought()));
        returned_object.setClient(user_serv.dtoToObject(requested_dto.getClient()));
        return returned_object;
    }

}
