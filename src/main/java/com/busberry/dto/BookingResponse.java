package com.busberry.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookingResponse {
    private String id;
    private String bookingId;
    private String userId;
    private String busId;
    private String routeId;
    private LocalDate tripDate;
    private List<SeatInfo> seats;
    private Double totalAmount;
    private Double discount;
    private Double finalAmount;
    private String paymentStatus;
    private String bookingStatus;
    private String qrCode;
    private String ticketPdf;
    private LocalDateTime createdAt;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SeatInfo {
        private String seatNumber;
        private String passengerName;
        private Double price;
    }
}

