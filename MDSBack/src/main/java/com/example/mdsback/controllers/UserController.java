package com.example.mdsback.controllers;


import com.example.mdsback.DTOs.SampleDTO;
import com.example.mdsback.DTOs.UserDTO;
import com.example.mdsback.models.Sample;
import com.example.mdsback.models.User;
import com.example.mdsback.repositories.UserRepository;
import com.example.mdsback.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserService userService;

    @CrossOrigin
    @GetMapping("/id/{id}")
    public UserDTO findById(@PathVariable Long id) {
        return new UserDTO(userService.findById(id));
    }

    @CrossOrigin
    @GetMapping("/name/{name}")
    public UserDTO findByName(@PathVariable String name) {
        return new UserDTO(userService.findByName(name));
    }
}
