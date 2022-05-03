package com.example.mdsback.controllers;

import com.example.mdsback.DTOs.PlaylistDTO;
import com.example.mdsback.models.Playlist;
import com.example.mdsback.models.Sample;
import com.example.mdsback.repositories.PlaylistRepository;
import com.example.mdsback.services.PlaylistService;
import com.example.mdsback.services.SampleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/playlists")
public class PlaylistController {
    @Autowired
    private PlaylistRepository playlistRepository;
    @Autowired
    private SampleService sampleService;
    @Autowired
    private PlaylistService playlistService;

    @GetMapping("/{id}")
    public PlaylistDTO findById(@PathVariable Long id) {
        return new PlaylistDTO(playlistService.findById(id));
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
        Playlist playlistToChange = playlistService.findById(playlistId);
        Sample sampleToAdd = sampleService.findById(sampleId);

        playlistToChange.getSamples().add(sampleToAdd);
        playlistRepository.save(playlistToChange);
    }
}
