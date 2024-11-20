package com.stellargear.heladeria.Services.ServiceImplementations;

import com.stellargear.heladeria.Models.DTOs.CartDTO;
import com.stellargear.heladeria.Models.DTOs.ProductDTO;
import com.stellargear.heladeria.Models.Entities.Product;
import com.stellargear.heladeria.Models.Entities.User;
import com.stellargear.heladeria.Services.CartService;
import com.stellargear.heladeria.Services.ProductService;
import com.stellargear.heladeria.Services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

    private final ProductService product_serv;
    private final UserService user_serv;


    @Override
    public CartDTO getUserCartInfo(String requested_user_id) {
        User requested_user = user_serv.searchUserById(requested_user_id);
        CartDTO requested_user_cart = new CartDTO();
        requested_user_cart.setCart_contents(product_serv.objectListToDto(requested_user.getUser_cart()));
        requested_user_cart.setTotal_cart_price(calculateCartTotal(requested_user_cart.getCart_contents()));
        requested_user_cart.setClient(user_serv.objectToDto(requested_user));
        return requested_user_cart;
    }


    @Transactional(propagation = Propagation.REQUIRED)
    @Override
    public ResponseEntity<?> addProductToCart(CartDTO added_cart_entry) {
        User user_requesting_product = user_serv.searchUserById(added_cart_entry.getUser_id());
        List<Product> current_user_cart = user_requesting_product.getUser_cart();
        Product added_product = product_serv.dtoToObject(product_serv.searchProductById(added_cart_entry.getRequested_product()));

        if (!current_user_cart.isEmpty()) {

            added_product.increaseQuantity(added_cart_entry.getQuantity());
            Product existing_product = current_user_cart.stream()
                    .filter(product -> product.getProduct_id().equals(added_product.getProduct_id()))
                    .findFirst()
                    .orElse(null);

            if (existing_product == null) {
                user_requesting_product.addToCart(added_product);
                user_serv.updateUserCart(user_requesting_product);
                return new ResponseEntity<>(HttpStatus.CREATED);

            } else {
                for (int i = 0; i < current_user_cart.size(); i++) {
                    if (added_product.getProduct_id().equals(current_user_cart.get(i).getProduct_id())) {
                        user_requesting_product.getUser_cart().get(i).increaseQuantity(added_cart_entry.getQuantity());
                        user_serv.updateUserCart(user_requesting_product);
                        return new ResponseEntity<>(HttpStatus.FOUND);
                    }
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


    @Transactional(propagation = Propagation.REQUIRED)
    @Override
    public ResponseEntity<?> deleteProductFromCart(CartDTO delete_request) {
        User requesting_user = user_serv.searchUserById(delete_request.getUser_id());
        List<Product> user_cart = (requesting_user.getUser_cart());
        user_cart.removeIf(product -> product.getProduct_id().equals(delete_request.getRequested_product()));
        requesting_user.setUser_cart(user_cart);
        user_serv.updateUserCart(requesting_user);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    @Transactional(propagation = Propagation.REQUIRED)
    @Override
    public ResponseEntity<?> updateCartProductQuantity(CartDTO new_details) {
        User requesting_user = user_serv.searchUserById(new_details.getUser_id());
        List<Product> user_cart = (requesting_user.getUser_cart());

        for (int i = 0; i < user_cart.size(); i++) {
            if (new_details.getRequested_product().equals(user_cart.get(i).getProduct_id())) {
                user_cart.get(i).setQuantity(new_details.getQuantity());
                requesting_user.setUser_cart(user_cart);
                user_serv.updateUserCart(requesting_user);
                return new ResponseEntity<>(HttpStatus.OK);
            }
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }


    @Override
    public int calculateCartTotal(List<ProductDTO> cart_to_calculate) {
        int total_value = 0;
        for (ProductDTO product : cart_to_calculate) {
            total_value += product.getPrice() * product.getQuantity() ;
        }
        return total_value;
    }
}
