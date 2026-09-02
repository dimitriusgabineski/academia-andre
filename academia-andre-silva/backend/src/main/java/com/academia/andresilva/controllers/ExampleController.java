package com.academia.andresilva.controllers;

import com.academia.andresilva.models.ExampleModel;
import com.academia.andresilva.services.ExampleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/examples")
public class ExampleController {

    @Autowired
    private ExampleService exampleService;

    @GetMapping
    public ResponseEntity<List<ExampleModel>> getAllExamples() {
        List<ExampleModel> examples = exampleService.findAll();
        return ResponseEntity.ok(examples);
    }

    @PostMapping
    public ResponseEntity<ExampleModel> createExample(@RequestBody ExampleModel exampleModel) {
        ExampleModel createdExample = exampleService.create(exampleModel);
        return ResponseEntity.status(201).body(createdExample);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ExampleModel> updateExample(@PathVariable Long id, @RequestBody ExampleModel exampleModel) {
        ExampleModel updatedExample = exampleService.update(id, exampleModel);
        return ResponseEntity.ok(updatedExample);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExample(@PathVariable Long id) {
        exampleService.delete(id);
        return ResponseEntity.noContent().build();
    }
}