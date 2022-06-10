package com.example.mdsback.services;

import com.example.mdsback.models.Sample;
import com.example.mdsback.models.User;
import com.example.mdsback.repositories.SampleRepository;
import com.example.mdsback.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.server.ResponseStatusException;

@Service
public class SampleService {
    @Autowired
    private SampleRepository sampleRepository;

    public Sample findById(Long id) {
        return sampleRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Sample not found"));
    }

    public void incrementLikes(Sample sample) {
        Long likes = sample.getLikes();
        if (likes == null){
            sample.setLikes(1L);
        }
        else {
            sample.setLikes(sample.getLikes() + 1);
        }
    }

    public Sample create(Sample sample) {
        return sampleRepository.save(sample);
    }

}
