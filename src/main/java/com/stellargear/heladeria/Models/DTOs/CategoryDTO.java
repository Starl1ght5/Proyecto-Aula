package com.stellargear.heladeria.Models.DTOs;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Setter
@Getter
public class CategoryDTO {

    private String category_id;
    private String name;
    private MultipartFile image;

    public CategoryDTO() {};

}
