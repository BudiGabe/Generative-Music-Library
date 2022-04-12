package com.example.mdsback.repositories;

import com.example.mdsback.models.Sample;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SampleRepository extends JpaRepository<Sample, Long> {
}
