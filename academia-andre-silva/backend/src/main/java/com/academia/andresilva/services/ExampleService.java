package com.academia.andresilva.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.academia.andresilva.models.ExampleModel;
import com.academia.andresilva.repositories.ExampleRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ExampleService {

    private final ExampleRepository exampleRepository;

    @Autowired
    public ExampleService(ExampleRepository exampleRepository) {
        this.exampleRepository = exampleRepository;
    }

    public List<ExampleModel> findAll() {
        return exampleRepository.findAll();
    }

    public Optional<ExampleModel> findById(Long id) {
        return exampleRepository.findById(id);
    }

    public ExampleModel save(ExampleModel exampleModel) {
        return exampleRepository.save(exampleModel);
    }

    public void deleteById(Long id) {
        exampleRepository.deleteById(id);
    }
}