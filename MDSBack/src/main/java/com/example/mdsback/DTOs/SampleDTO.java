package com.example.mdsback.DTOs;

import com.example.mdsback.models.Note;
import com.example.mdsback.models.Sample;
import lombok.Data;

import java.util.ArrayList;
import java.util.Collection;

@Data
public class SampleDTO {
    private String name;
    private float totalTime;
    private Collection<NoteDTO> notes = new ArrayList<>();

    public SampleDTO() {
    }

    // Add playlists if needed
    public SampleDTO(Sample sample) {
        this.name = sample.getName();
        this.totalTime = sample.getTotalTime();
        for (Note note : sample.getNotes()) {
            NoteDTO noteDTO = new NoteDTO();
            noteDTO.setStartTime(note.getStartTime());
            noteDTO.setEndTime(note.getEndTime());
            noteDTO.setPitch(note.getPitch());

            notes.add(noteDTO);
        }
    }
}
