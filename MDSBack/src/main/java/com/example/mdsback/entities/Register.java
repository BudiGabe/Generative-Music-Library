package com.example.mdsback.entities;

import java.time.LocalDate;

public class Register extends Login{
   private Integer id;
   private String name;
   private String surname;
   private String phone;
   private LocalDate birthDate;
   public Register() {
       super();
    }

    public Register(Integer id, String name, String surname, String email, String phone, String password, LocalDate birthDate) {
        super(email,password);
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.phone = phone;
        this.birthDate = birthDate;
    }

    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getSurname() {
        return surname;
    }

    public String getPhone() {
        return phone;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }

}
