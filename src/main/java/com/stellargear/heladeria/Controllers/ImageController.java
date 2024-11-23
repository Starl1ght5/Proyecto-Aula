package com.stellargear.heladeria.Controllers;


import com.stellargear.heladeria.Services.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequiredArgsConstructor
public class ImageController {

    private final ImageService image_serv;


    @GetMapping(path = "/api/images/category/{requested_id}")
    public ResponseEntity<Resource> sendCategoryImage(@PathVariable String requested_id) {
        return image_serv.getCategoryImage(requested_id);
    }


    @GetMapping(path = "/api/images/product/{requested_id}")
    public ResponseEntity<Resource> sendProductImage(@PathVariable String requested_id) {
        return image_serv.getProductImage(requested_id);
    }
}
