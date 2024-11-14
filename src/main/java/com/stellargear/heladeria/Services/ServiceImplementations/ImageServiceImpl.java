package com.stellargear.heladeria.Services.ServiceImplementations;

import com.stellargear.heladeria.Services.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class ImageServiceImpl implements ImageService {

    private final String PRODUCT_IMAGE_STORAGE_FILE_PATH;
    private final String CATEGORY_IMAGE_STORAGE_FILE_PATH;

    @Autowired
    public ImageServiceImpl (@Value("${user.product_image_file_path}") String file_path_1, @Value("${user.category_image_file_path}") String file_path_2) {
        this.PRODUCT_IMAGE_STORAGE_FILE_PATH = file_path_1;
        this.CATEGORY_IMAGE_STORAGE_FILE_PATH = file_path_2;
    }


    public void uploadProductImage(String product_id, MultipartFile image) {
        try {
            String image_file_path = PRODUCT_IMAGE_STORAGE_FILE_PATH + product_id + ".png";
            File final_path = new File(image_file_path);
            image.transferTo(final_path);

        } catch (IOException e) {
            e.printStackTrace();
        }
    }


    public void uploadCategoryImage(String category_id, MultipartFile image) {
        try {
            String image_file_path = CATEGORY_IMAGE_STORAGE_FILE_PATH + category_id + ".png";
            File final_path = new File(image_file_path);
            image.transferTo(final_path);

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /// TODO Implementar esta mierda
    ///public void deleteImage(String requested_id) {
    ///try {
    ///String image_route = IMAGE_STORAGE_FILE_PATH + requested_id + ".png";
    ///}
    ///}


    public ResponseEntity<Resource> getCategoryImage(String requested_id) {
        try {
            String image_route = CATEGORY_IMAGE_STORAGE_FILE_PATH + requested_id + ".png";

            Path image_path = Paths.get(image_route);
            byte[] image_bytes = Files.readAllBytes(image_path);
            ByteArrayResource resource = new ByteArrayResource(image_bytes);

            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_PNG)
                    .body(resource);

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

    }

    public ResponseEntity<Resource> getProductImage(String requested_id) {
        try {

            String image_route = PRODUCT_IMAGE_STORAGE_FILE_PATH + requested_id + ".png";

            Path image_path = Paths.get(image_route);
            byte[] image_bytes = Files.readAllBytes(image_path);
            ByteArrayResource resource = new ByteArrayResource(image_bytes);

            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_PNG)
                    .body(resource);

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

    }
}
