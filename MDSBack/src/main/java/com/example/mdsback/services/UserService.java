package com.example.mdsback.services;

import com.example.mdsback.DTOs.UserDTO;
import com.example.mdsback.models.Playlist;
import com.example.mdsback.models.Sample;
import com.example.mdsback.models.User;
import com.example.mdsback.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PlaylistService playlistService;

    @Autowired
    private SampleService sampleService;

    @Autowired
    private PasswordEncoder bCryptPasswordEncoder;

    public User findById(@PathVariable Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    }

    public User findByName(@PathVariable String name) {
        return userRepository.findByName(name);
    }

    public User create(User user) {
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public User addSampleToUser(Long sampleId, Long userId) {
        User userToChange = this.findById(userId);
        Sample sampleToAdd = sampleService.findById(sampleId);
        userToChange.getSamples().add(sampleToAdd);
        return userRepository.save(userToChange);
    }

    public User addPlaylistToUser(Long playlistId, Long userId) {
        User userToChange = this.findById(userId);
        Playlist playlistToAdd = playlistService.findById(playlistId);
        userToChange.getPlaylists().add(playlistToAdd);
        return userRepository.save(userToChange);
    }

}
