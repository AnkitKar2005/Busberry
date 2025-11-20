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

import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "routes")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Route {

    @Id
    private String id;

    @Indexed
    private String operatorId;

    @Indexed
    private String busId;

    private Location from;
    private Location to;
    private List<ViaStop> via;

    private Double distance; // Kilometers
    private Integer duration; // Minutes

    private String departureTime; // HH:mm format
    private String arrivalTime; // HH:mm format
    private List<Integer> daysOfWeek; // 0=Sunday, 1=Monday, etc.

    private Double basePrice;
    private DynamicPricing dynamicPricing;

    @Builder.Default
    private Boolean isActive = true;

    @Builder.Default
    private Integer totalBookings = 0;

    @Builder.Default
    private Double averageRating = 0.0;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Location {
        private String city;
        private String state;
        private String location; // Bus stand/stop name
        private Coordinates coordinates;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Coordinates {
        private Double lat;
        private Double lng;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ViaStop {
        private String city;
        private String location;
        private Coordinates coordinates;
        private Integer stopTime; // Minutes to wait
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class DynamicPricing {
        @Builder.Default
        private Boolean enabled = false;
        private Double minPrice;
        private Double maxPrice;
        @Builder.Default
        private Double currentMultiplier = 1.0;
    }
}

