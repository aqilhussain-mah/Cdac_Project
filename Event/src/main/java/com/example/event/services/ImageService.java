package com.example.event.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.event.entity.Imageimg;
import com.example.event.repository.ImageRepository;

import java.util.List;

@Service
public class ImageService {

    @Autowired
    private ImageRepository imageRepository;

    public Imageimg getImageById(Integer imageId) {
        return imageRepository.findById(imageId).orElse(null);
    }

    public Imageimg saveImage(Imageimg image) {
        return imageRepository.save(image);
    }

    public void deleteImage(Integer imageId) {
        imageRepository.deleteById(imageId);
    }

    public List<Imageimg> findAll() {
        return imageRepository.findAll();
    }
}
