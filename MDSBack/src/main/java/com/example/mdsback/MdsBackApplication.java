package com.example.mdsback;

import com.example.mdsback.entities.AppUser;
import com.example.mdsback.entities.AppUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.Month;
import java.util.List;

@SpringBootApplication
public class MdsBackApplication {

    public static void main(String[] args) {
        SpringApplication.run(MdsBackApplication.class, args);

    }


}
