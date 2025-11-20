package com.busberry.controller;

import com.busberry.dto.BusSearchResult;
import com.busberry.dto.SearchRequest;
import com.busberry.service.SearchService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/search")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class SearchController {

    private final SearchService searchService;

    @PostMapping("/buses")
    public ResponseEntity<List<BusSearchResult>> searchBuses(@Valid @RequestBody SearchRequest request) {
        return ResponseEntity.ok(searchService.searchBuses(request));
    }

    @GetMapping("/popular")
    public ResponseEntity<List<BusSearchResult>> getPopularRoutes() {
        // Mock implementation - can be enhanced with actual popular routes logic
        return ResponseEntity.ok(List.of());
    }
}

