package com.stellargear.heladeria.Services;

import com.stellargear.heladeria.Models.DTOs.CartDTO;
import com.stellargear.heladeria.Models.DTOs.UserDTO;
import org.springframework.http.ResponseEntity;

public interface CartService {

    UserDTO getUserCartInfo(String requested_user_id);

    ResponseEntity<?> addProductToCart(CartDTO addded_cart_entry);
}
