package com.stellargear.heladeria.Services;

import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface ImageService {

    public void uploadImage(String product_id, MultipartFile image);

    public ResponseEntity<Resource> getImage(String requested_id);
}
