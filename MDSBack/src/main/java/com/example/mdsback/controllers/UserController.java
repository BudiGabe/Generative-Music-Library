package com.example.mdsback.controllers;


import com.example.mdsback.DTOs.PlaylistDTO;
import com.example.mdsback.DTOs.SampleDTO;
import com.example.mdsback.DTOs.UserDTO;
import com.example.mdsback.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
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
    @PutMapping("/sample/{userName}/{sampleId}")
    public UserDTO addSampleToUser(@PathVariable String userName, @PathVariable Long sampleId) {
        return new UserDTO(userService.addSampleToUser(sampleId, userName));
    }

    @CrossOrigin
    @PutMapping("/playlist/{userName}/{playlistId}")
    public UserDTO addPlaylistToUser(@PathVariable String userName, @PathVariable Long playlistId) {
        return new UserDTO(userService.addPlaylistToUser(playlistId, userName));
    }

    @CrossOrigin
    @GetMapping("/samples/{userName}")
    public List<SampleDTO> getSamplesOfUser(@PathVariable String userName) {
        return userService.getSamplesOfUser(userName)
                .stream()
                .map(SampleDTO::new)
                .collect(Collectors.toList());
    }

    @CrossOrigin
    @GetMapping("/playlists/{userName}")
    public List<PlaylistDTO> getPlaylistsOfUser(@PathVariable String userName) {
        return userService.getPlaylistsOfUser(userName)
                .stream()
                .map(PlaylistDTO::new)
                .collect(Collectors.toList());
    }
}
