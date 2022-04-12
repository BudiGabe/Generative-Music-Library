package com.example.mdsback.controllers;

import com.example.mdsback.DTOs.PlaylistDTO;
import com.example.mdsback.models.Playlist;
import com.example.mdsback.repositories.PlaylistRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/playlists")
public class PlaylistController {
    @Autowired
    private PlaylistRepository playlistRepository;
    private ModelMapper modelMapper;

    @GetMapping("/{id}")
    public Playlist findById(@PathVariable Long id) {
        return playlistRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Playlist not found"));
    }

    @GetMapping
    public List<PlaylistDTO> findAll() {
        return playlistRepository.findAll()
                .stream()
                .map(PlaylistDTO::new)
                .collect(Collectors.toList());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Playlist create(@RequestBody Playlist playlist) {
        return playlistRepository.save(playlist);
    }
}
