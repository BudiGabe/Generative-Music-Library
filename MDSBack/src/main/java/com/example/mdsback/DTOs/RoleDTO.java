package com.example.mdsback.DTOs;

import com.example.mdsback.models.Role;
import lombok.Data;

@Data
public class RoleDTO {
    private String name;

    public RoleDTO(Role role) {
        this.name = role.getName();
    }
}
