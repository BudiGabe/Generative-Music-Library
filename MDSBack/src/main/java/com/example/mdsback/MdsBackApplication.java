package com.example.mdsback;

import com.example.mdsback.entities.Login;
import com.example.mdsback.entities.Register;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.Month;
import java.util.List;

@SpringBootApplication
@RestController
public class MdsBackApplication {
    public static void main(String[] args) {
        SpringApplication.run(MdsBackApplication.class, args);
    }
    @GetMapping
    public List<Register> show()
    {
        return List.of(new Register(
                3,
                "Mihailescu",
                "George",
                "george@hotmail.com",
                "075567289077",
                "password123", LocalDate.of(2001, Month.APRIL,25)));
    }
}
