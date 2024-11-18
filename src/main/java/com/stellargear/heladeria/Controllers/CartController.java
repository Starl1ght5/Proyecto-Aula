package com.stellargear.heladeria.Controllers;

import com.stellargear.heladeria.Models.DTOs.CartDTO;
import com.stellargear.heladeria.Services.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin
public class CartController {

    private final CartService cart_serv;


    @PostMapping(path="/api/cart/add")
    public ResponseEntity<?> addProductToCart(@RequestBody CartDTO new_cart_entry) {
        return cart_serv.addProductToCart(new_cart_entry);
    }

    @DeleteMapping(path = "/api/cart/delete")
    public ResponseEntity<?> deleteProductFromCart(@RequestBody CartDTO delete_request) {
        return cart_serv.deleteProductFromCart(delete_request);
    }


    @GetMapping(path = "/api/cart/search/{requesting_user_id}")
    public CartDTO getRequestingUserCartInfo(@PathVariable String requesting_user_id) {
        return cart_serv.getUserCartInfo(requesting_user_id);
    }


    @PutMapping(path = "/api/cart/update")
    public ResponseEntity<?> updateProductCartQuantity(@RequestBody CartDTO new_details) {
        return cart_serv.updateCartProductQuantity(new_details);
    }
}
