package com.stellargear.heladeria.Controllers;

import com.stellargear.heladeria.Models.DTOs.CartDTO;
import com.stellargear.heladeria.Models.DTOs.UserDTO;
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



    @GetMapping(path = "/api/cart/search/{requesting_user_id}")
    public UserDTO getRequestingUserCartInfo(@PathVariable String requesting_user_id) {
        return cart_serv.getUserCartInfo(requesting_user_id);
    }
}
