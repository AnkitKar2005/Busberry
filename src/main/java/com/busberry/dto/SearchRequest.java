package com.busberry.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SearchRequest {
    @NotBlank(message = "From city is required")
    private String from;

    @NotBlank(message = "To city is required")
    private String to;

    @NotBlank(message = "Date is required")
    private LocalDate date;

    @Builder.Default
    private Integer passengers = 1;
    private List<String> seatType;
    private List<String> amenities;
    private Double maxPrice;
}

