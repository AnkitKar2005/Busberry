package com.busberry.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

/**
 * Bus Model
 * Represents bus fleet information
 */
@Document(collection = "buses")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Bus {

    @Id
    private String id;

    @Indexed
    private String operatorId;

    @Indexed(unique = true)
    private String busNumber;

    private String busName;
    private String busType; // SLEEPER, SEMI_SLEEPER, SEATER, AC_SLEEPER, NON_AC

    private Integer totalSeats;

    private SeatLayout seatLayout;

    private List<String> amenities; // AC, WIFI, CHARGING, etc.

    private BusFeatures features;

    private List<String> images;
    private String digitalTwin3D; // URL to 3D model

    private String registrationNumber;
    private String insuranceNumber;
    private LocalDate insuranceExpiry;
    private LocalDate fitnessExpiry;
    private LocalDate permitExpiry;

    @Builder.Default
    private Boolean isActive = true;
    @Builder.Default
    private Boolean isApproved = false; // Admin approval required

    @Builder.Default
    private Double rating = 0.0;
    @Builder.Default
    private Integer totalReviews = 0;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SeatLayout {
        private String type; // 2x2, 2x1, etc.
        private Integer rows;
        private Integer columns;
        private List<Seat> seats;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Seat {
        private String seatNumber;
        private String seatType; // WINDOW, AISLE, MIDDLE, UPPER_BERTH, LOWER_BERTH
        private Boolean isLadiesSeat = false;
        private Boolean isAvailable = true;
        private Double price;
        private List<String> amenities;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class BusFeatures {
        @Builder.Default
        private Boolean isEcoFriendly = false;
        @Builder.Default
        private Integer noiseRating = 3; // 1-5
        @Builder.Default
        private Double comfortScore = 5.0; // AI-generated, 1-10
        @Builder.Default
        private Boolean hasSilentCabin = false;
        @Builder.Default
        private Boolean ladiesSeatZone = false;
    }
}

