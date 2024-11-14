package com.stellargear.heladeria.Repositories;

import com.stellargear.heladeria.Models.Entities.Payment;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PaymentRepository extends MongoRepository<Payment, String> {
}
