package com.example.mdsback.controllers;


import com.example.mdsback.DTOs.PlaylistDTO;
import com.example.mdsback.DTOs.SampleDTO;
import com.example.mdsback.DTOs.UserDTO;
import com.example.mdsback.models.Playlist;
import com.example.mdsback.models.Sample;
import com.example.mdsback.models.User;
import com.example.mdsback.repositories.UserRepository;
import com.example.mdsback.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

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

    @CrossOrigin
    @PutMapping("/sample/{userId}/{sampleId}")
    public UserDTO addSampleToUser(@PathVariable Long userId, @PathVariable Long sampleId) {
        return new UserDTO(userService.addSampleToUser(sampleId, userId));
    }

    @CrossOrigin
    @PutMapping("/playlist/{userId}/{playlistId}")
    public UserDTO addPlaylistToUser(@PathVariable Long userId, @PathVariable Long playlistId) {
        return new UserDTO(userService.addPlaylistToUser(playlistId, userId));
    }

    @CrossOrigin
    @GetMapping("/samples/{userId}")
    public List<SampleDTO> getSamplesOfUser(@PathVariable Long userId) {
        return userService.getSamplesOfUser(userId)
                .stream()
                .map(SampleDTO::new)
                .collect(Collectors.toList());
    }

    @CrossOrigin
    @GetMapping("/playlists/{userId}")
    public List<PlaylistDTO> getPlaylistsOfUser(@PathVariable Long userId) {
        return userService.getPlaylistsOfUser(userId)
                .stream()
                .map(PlaylistDTO::new)
                .collect(Collectors.toList());
    }
}
