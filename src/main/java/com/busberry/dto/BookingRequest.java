package com.busberry.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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
public class BookingRequest {
    @NotBlank(message = "Route ID is required")
    private String routeId;

    @NotBlank(message = "Bus ID is required")
    private String busId;

    @NotNull(message = "Trip date is required")
    private LocalDate tripDate;

    @NotNull(message = "Seats are required")
    private List<SeatBookingRequest> seats;

    private String couponCode;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SeatBookingRequest {
        @NotBlank(message = "Seat number is required")
        private String seatNumber;
        @NotBlank(message = "Passenger name is required")
        private String passengerName;
        private Integer passengerAge;
        private String passengerGender;
        private String idProof;
        private String idNumber;
    }
}

