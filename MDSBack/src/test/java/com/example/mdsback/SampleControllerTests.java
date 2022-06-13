package com.example.mdsback;

import com.example.mdsback.models.Note;
import com.example.mdsback.models.Sample;
import com.example.mdsback.models.User;
import com.example.mdsback.services.SampleService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import static org.hamcrest.Matchers.hasSize;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/*
    Service layer testing
 */
@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class SampleControllerTests {
    @Autowired
    private MockMvc mvc;

    @MockBean
    private SampleService service;

    private Sample sample1;
    private Sample sample2;
    private Sample sample3;
    private Note note1;
    private Note note2;
    private Note note3;
    private List<Sample> allSamples;
    private List<Note> allNotes;

    @BeforeEach
    public void setUp() {
        note1 = new Note(1L, 62, 0f, 1f, new ArrayList<>());
        note2 = new Note(2L, 64, 1f, 2f, new ArrayList<>());
        note3 = new Note(3L, 66, 2f, 3f, new ArrayList<>());
        allNotes = Arrays.asList(note1, note2, note3);

        sample1 = new Sample(1L, "sample1", 4f, 123L, allNotes, new ArrayList<>(), new User());
        sample2 = new Sample(2L, "sample2", 5f, 1234L, allNotes, new ArrayList<>(), new User());
        sample3 = new Sample(3L, "sample3", 6f, 12L, allNotes, new ArrayList<>(), new User());
        allSamples = Arrays.asList(sample1, sample2, sample3);
    }

    @Test
    @WithMockUser
    public void givenSamples_whenGetSamples_thenReturnJsonArray() throws Exception {
        given(service.findAll()).willReturn(allSamples);

        mvc.perform(get("/api/samples")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(3)))
                .andExpect(jsonPath("$[0].name").value(sample1.getName()));
    }

    @Test
    @WithMockUser
    public void givenTopSamples_whenGetTopSamples_thenReturnJsonArray() throws Exception {
        given(service.findAllTop()).willReturn(allSamples.stream()
                .sorted((s1, s2) -> (int) (s2.getLikes() - s1.getLikes()))
                .collect(Collectors.toList()));

        mvc.perform(get("/api/samples/top")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(3)))
                .andExpect(jsonPath("$[0].name").value(sample2.getName()));
    }

    @Test
    @WithMockUser
    public void givenNewSamples_whenGetNewSamples_thenReturnJsonArray() throws Exception {
        given(service.findAllNew()).willReturn(allSamples.stream()
                .sorted((s1, s2) -> (int) (s1.getId() - s2.getId()))
                .collect(Collectors.toList()));

        mvc.perform(get("/api/samples/new")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(3)))
                .andExpect(jsonPath("$[0].name").value(sample1.getName()));
    }

    @Test
    @WithMockUser
    public void givenLikeSampleAndFindById_whenLikeSample_thenReturnJsonLikedSample() throws Exception {
        Sample likedSample = sample1;
        likedSample.setLikes(likedSample.getLikes() + 1);

        given(service.likeSample(Mockito.any())).willReturn(likedSample);
        given(service.findById(Mockito.any())).willReturn(sample1);

        mvc.perform(put("/api/samples/like/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.likes").value(likedSample.getLikes()));
    }

    @Test
    @WithMockUser
    public void givenFindById_whenFindById_thenReturnJsonSample() throws Exception {
        given(service.findById(Mockito.any())).willReturn(sample1);

        mvc.perform(get("/api/samples/id/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(sample1.getId()));
    }

    @Test
    @WithMockUser
    public void givenFindById_whenFindById_thenReturnNotFound() throws Exception {
        given(service.findById(Mockito.any()))
                .willThrow(new ResponseStatusException(HttpStatus.NOT_FOUND, "Sample not found"));

        mvc.perform(get("/api/samples/id/15")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }
}
