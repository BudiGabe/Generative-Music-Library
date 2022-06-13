package com.example.mdsback.services;

import com.example.mdsback.DTOs.SampleDTO;
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
import java.util.Collection;
import java.util.List;

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

    private final LoggingService logger = new LoggingService();

    public User findById(@PathVariable Long id) {
        logger.log("Searching for user with id " + id);
        return userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    }

    public User findByName(@PathVariable String name) {
        logger.log("Searching for user with name " + name);
        return userRepository.findByName(name);
    }

    public User create(User user) {
        logger.log("Creating new user with name " + user.getName());
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public User addSampleToUser(Long sampleId, Long userId) {
        logger.log("Adding sample with id " + sampleId + " to user with id " + userId);
        User userToChange = this.findById(userId);
        Sample sampleToAdd = sampleService.findById(sampleId);
        userToChange.getSamples().add(sampleToAdd);
        return userRepository.save(userToChange);
    }

    public User addPlaylistToUser(Long playlistId, Long userId) {
        logger.log("Adding playlist with id " + playlistId + " to user with id " + userId);
        User userToChange = this.findById(userId);
        Playlist playlistToAdd = playlistService.findById(playlistId);
        userToChange.getPlaylists().add(playlistToAdd);
        return userRepository.save(userToChange);
    }

    public Collection<Sample> getSamplesOfUser(Long id) {
        logger.log("Getting all samples of user with id " + id);
        User user = this.findById(id);
        return user.getSamples();
    }

    public Collection<Playlist> getPlaylistsOfUser(Long id) {
        logger.log("Getting all playlists of user with id " + id);
        User user = this.findById(id);
        return user.getPlaylists();
    }
}
