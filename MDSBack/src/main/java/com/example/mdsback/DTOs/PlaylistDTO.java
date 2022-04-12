package com.example.mdsback.DTOs;

import com.example.mdsback.models.Playlist;
import com.example.mdsback.models.Sample;
import lombok.Data;

import java.util.ArrayList;
import java.util.Collection;
import java.util.stream.Collectors;

@Data
public class PlaylistDTO {
    private String name;
    private Collection<SampleDTO> samples = new ArrayList<>();

    public PlaylistDTO() {}

    public PlaylistDTO(Playlist playlist) {
        this.name = playlist.getName();
        for (Sample sample : playlist.getSamples()) {
           SampleDTO sampleDTO = new SampleDTO();
           sampleDTO.setName(sample.getName());
           sampleDTO.setTotalTime(sample.getTotalTime());
           sampleDTO.setNotes(sample.getNotes()
                   .stream()
                   .map(NoteDTO::new)
                   .collect(Collectors.toList()));

           samples.add(sampleDTO);
        }
    }
}
