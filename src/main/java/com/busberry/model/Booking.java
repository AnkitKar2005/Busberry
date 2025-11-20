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

@Document(collection = "bookings")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Booking {

    @Id
    private String id;

    @Indexed(unique = true)
    private String bookingId; // Format: BB-YYYYMMDD-XXXXXX

    @Indexed
    private String userId;

    @Indexed
    private String operatorId;

    @Indexed
    private String busId;

    @Indexed
    private String routeId;

    private java.time.LocalDate tripDate;

    private List<SeatBooking> seats;

    private Point boardingPoint;
    private Point droppingPoint;

    private Double totalAmount;
    private Double discount;
    private String couponCode;
    private Double finalAmount;

    private String paymentStatus; // PENDING, PAID, FAILED, REFUNDED
    private String paymentMethod; // RAZORPAY, PAYTM, UPI, WALLET
    private String paymentId;

    private String bookingStatus; // CONFIRMED, CANCELLED, COMPLETED, NO_SHOW
    private String cancellationReason;
    private LocalDateTime cancelledAt;

    private Double refundAmount;
    private String refundStatus; // NONE, PENDING, PROCESSED, FAILED

    private String qrCode; // Encrypted QR code data
    private String ticketPdf; // URL to PDF

    private Insurance insurance;
    private GpsTracking gpsTracking;
    private Notifications notifications;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;

    private LocalDateTime expiresAt;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class SeatBooking {
        private String seatNumber;
        private String passengerName;
        private Integer passengerAge;
        private String passengerGender;
        private String idProof;
        private String idNumber;
        private Double price;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Point {
        private String location;
        private Route.Coordinates coordinates;
        private LocalDateTime time;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Insurance {
        @Builder.Default
        private Boolean included = false;
        private Double amount;
        private String policyNumber;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class GpsTracking {
        @Builder.Default
        private Boolean enabled = false;
        private String trackingUrl;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Notifications {
        @Builder.Default
        private Boolean smsSent = false;
        @Builder.Default
        private Boolean emailSent = false;
        @Builder.Default
        private Boolean whatsappSent = false;
    }
}

