package com.busberry;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.data.mongodb.config.EnableMongoAuditing;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

/**
 * BusBerry - Next-Generation Intelligent Bus Booking Platform
 * Main Application Entry Point
 * 
 * @author BusBerry Team
 * @version 1.0.0
 */
@SpringBootApplication
@EnableMongoAuditing
@EnableCaching
@EnableAsync
@EnableScheduling
public class BusBerryApplication {

    public static void main(String[] args) {
        SpringApplication.run(BusBerryApplication.class, args);
        System.out.println("""
                
                ╔═══════════════════════════════════════════════════════╗
                ║                                                       ║
                ║          🚌 BusBerry Backend Started                  ║
                ║                                                       ║
                ║     Next-Generation Bus Booking Platform             ║
                ║                                                       ║
                ║     API Docs: http://localhost:8080/swagger-ui.html  ║
                ║     Health:   http://localhost:8080/actuator/health  ║
                ║                                                       ║
                ╚═══════════════════════════════════════════════════════╝
                """);
    }
}

