package com.busberry.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BusSearchResult {
    private String busId;
    private String busName;
    private String operatorName;
    private String departureTime;
    private String arrivalTime;
    private String duration;
    private Integer availableSeats;
    private Double price;
    private Double rating;
    private List<String> amenities;
    private Double comfortScore;
    private String routeId;
}

