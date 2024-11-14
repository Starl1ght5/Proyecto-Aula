package com.stellargear.heladeria.Services.ServiceImplementations;

import com.stellargear.heladeria.Models.DTOs.CartDTO;
import com.stellargear.heladeria.Models.DTOs.UserDTO;
import com.stellargear.heladeria.Models.Entities.Product;
import com.stellargear.heladeria.Models.Entities.User;
import com.stellargear.heladeria.Services.CartService;
import com.stellargear.heladeria.Services.ProductService;
import com.stellargear.heladeria.Services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

    private final ProductService product_serv;
    private final UserService user_serv;


    @Override
    public UserDTO getUserCartInfo(String requested_user_id) {
        User requested_user = user_serv.searchUserById(requested_user_id);
        UserDTO requested_cart_info = new UserDTO();
        requested_cart_info.setUser_cart(product_serv.objectListToDto(requested_user.getUser_cart()));
        return requested_cart_info;
    }


    @Override
    public ResponseEntity<?> addProductToCart(CartDTO added_cart_entry) {
        User user_requesting_product = user_serv.searchUserById(added_cart_entry.getUser_id());
        List<Product> current_user_cart = user_requesting_product.getUser_cart();
        Product added_product = product_serv.dtoToObject(product_serv.searchProductById(added_cart_entry.getRequested_product()));

        if (!current_user_cart.isEmpty()) {
            for (int i = 0; i < current_user_cart.size(); i++) {
                if (added_product.equals(current_user_cart.get(i))) {
                    added_product.setQuantity(current_user_cart.get(i).getQuantity() + added_cart_entry.getQuantity());
                    current_user_cart.set(i, added_product);
                    user_requesting_product.setUser_cart(current_user_cart);
                    user_serv.updateUserCart(user_requesting_product);
                    return new ResponseEntity<>(HttpStatus.OK);
                }
            }
        } else {
            added_product.setQuantity(added_cart_entry.getQuantity());
            current_user_cart.add(added_product);
            user_requesting_product.setUser_cart(current_user_cart);
            user_serv.updateUserCart(user_requesting_product);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
