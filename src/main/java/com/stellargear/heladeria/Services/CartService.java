package com.stellargear.heladeria.Services;

import com.stellargear.heladeria.Models.DTOs.CartDTO;
import com.stellargear.heladeria.Models.DTOs.ProductDTO;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface CartService {

    CartDTO getUserCartInfo(String requested_user_id);

    ResponseEntity<?> addProductToCart(CartDTO addded_cart_entry);
    ResponseEntity<?> deleteProductFromCart(CartDTO delete_request);

    ResponseEntity<?> updateCartProductQuantity(CartDTO new_details);
    int calculateCartTotal(List<ProductDTO> cart_to_calculate);
}
