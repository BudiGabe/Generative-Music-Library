package com.example.mdsback;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import Entities.User;
@SpringBootApplication
public class MdsBackApplication {
    public static void main(String[] args) {
        SpringApplication.run(MdsBackApplication.class, args);
        User user = new User();
    }

}
