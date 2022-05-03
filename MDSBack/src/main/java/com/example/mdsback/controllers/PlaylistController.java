package com.example.mdsback.controllers;

import com.example.mdsback.DTOs.PlaylistDTO;
import com.example.mdsback.models.Playlist;
import com.example.mdsback.models.Sample;
import com.example.mdsback.repositories.PlaylistRepository;
import com.example.mdsback.repositories.SampleRepository;
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
    @Autowired
    private SampleRepository sampleRepository;

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

    @ResponseStatus(HttpStatus.OK)
    @PutMapping("/{playlistId}/{sampleId}")
    public void addSampleById(@PathVariable Long playlistId, @PathVariable Long sampleId) {
        Playlist playlistToChange = playlistRepository.findById(playlistId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Playlist not found"));

        Sample sampleToAdd = sampleRepository.findById(sampleId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Sample not found"));

        playlistToChange.getSamples().add(sampleToAdd);
        playlistRepository.save(playlistToChange);
    }
}
