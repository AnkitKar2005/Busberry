package com.busberry.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/operator")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class OperatorController {

    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, Object>> getDashboard(Authentication authentication) {
        // String operatorId = authentication.getName(); // Will be used when implementing full dashboard
        
        Map<String, Object> dashboard = new HashMap<>();
        dashboard.put("totalBuses", 0);
        dashboard.put("totalBookings", 0);
        dashboard.put("totalEarnings", 0.0);
        
        return ResponseEntity.ok(dashboard);
    }
}

