package com.stellargear.heladeria.Services;

import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface ImageService {

    void uploadProductImage(String product_id, MultipartFile image);
    void uploadCategoryImage(String category_id, MultipartFile image);

    ResponseEntity<Resource> getCategoryImage(String requested_id);
    ResponseEntity<Resource> getProductImage(String requested_id);
}
