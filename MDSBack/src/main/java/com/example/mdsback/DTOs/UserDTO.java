package com.example.mdsback.DTOs;

import com.example.mdsback.models.Playlist;
import com.example.mdsback.models.Sample;
import com.example.mdsback.models.User;

import java.util.ArrayList;
import java.util.Collection;
import java.util.stream.Collectors;

public class UserDTO {
    private Long id;
    private String name;
    private String password;
    private Collection<SampleDTO> samples = new ArrayList<>();
    private Collection<PlaylistDTO> playlists = new ArrayList<>();

    public UserDTO(User user) {
        this.id = user.getId();
        this.name = user.getName();
        this.password = user.getPassword();
        this.samples = user.getSamples()
                .stream()
                .map(SampleDTO::new)
                .collect(Collectors.toList());
        this.playlists = user.getPlaylists()
                .stream()
                .map(PlaylistDTO::new)
                .collect(Collectors.toList());
    }
}
