package com.busberry.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AdminController {

    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, Object>> getDashboard(Authentication authentication) {
        Map<String, Object> dashboard = new HashMap<>();
        dashboard.put("totalUsers", 0);
        dashboard.put("totalOperators", 0);
        dashboard.put("totalBookings", 0);
        dashboard.put("totalRevenue", 0.0);
        
        return ResponseEntity.ok(dashboard);
    }
}

