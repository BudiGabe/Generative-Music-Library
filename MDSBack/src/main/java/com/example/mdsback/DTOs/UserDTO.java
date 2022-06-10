package com.example.mdsback.DTOs;

import com.example.mdsback.models.Role;
import com.example.mdsback.models.User;
import lombok.Data;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Data
public class UserDTO {
    private Long id;
    private String name;
    private String password;
    private Collection<SampleDTO> samples = new ArrayList<>();
    private Collection<PlaylistDTO> playlists = new ArrayList<>();
    private Collection<RoleDTO> roles = new ArrayList<>();

    public UserDTO(User user) {
        this.id = user.getId();
        this.name = user.getName();
        this.password = user.getPassword();
        if (user.getSamples() != null) {
            this.samples = user.getSamples()
                    .stream()
                    .map(SampleDTO::new)
                    .collect(Collectors.toList());
        }
        if (user.getPlaylists() != null) {
            this.playlists = user.getPlaylists()
                    .stream()
                    .map(PlaylistDTO::new)
                    .collect(Collectors.toList());
        }

        this.roles = user.getRoles()
                .stream()
                .map(RoleDTO::new)
                .collect(Collectors.toList());
    }
}
