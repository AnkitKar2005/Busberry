package com.busberry.controller;

import com.busberry.dto.BookingRequest;
import com.busberry.dto.BookingResponse;
import com.busberry.service.BookingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/booking")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class BookingController {

    private final BookingService bookingService;

    @PostMapping("/create")
    public ResponseEntity<BookingResponse> createBooking(
            @Valid @RequestBody BookingRequest request,
            Authentication authentication) {
        String userId = authentication.getName();
        return ResponseEntity.ok(bookingService.createBooking(request, userId));
    }

    @GetMapping("/{bookingId}")
    public ResponseEntity<BookingResponse> getBooking(@PathVariable String bookingId) {
        return ResponseEntity.ok(bookingService.getBooking(bookingId));
    }

    @GetMapping("/history")
    public ResponseEntity<List<BookingResponse>> getBookingHistory(Authentication authentication) {
        String userId = authentication.getName();
        return ResponseEntity.ok(bookingService.getUserBookings(userId));
    }

    @PostMapping("/{bookingId}/cancel")
    public ResponseEntity<BookingResponse> cancelBooking(
            @PathVariable String bookingId,
            @RequestBody CancelBookingRequest request,
            Authentication authentication) {
        String userId = authentication.getName();
        return ResponseEntity.ok(bookingService.cancelBooking(bookingId, request.getReason(), userId));
    }

    // DTO for cancel request
    public static class CancelBookingRequest {
        private String reason;
        public String getReason() { return reason; }
        public void setReason(String reason) { this.reason = reason; }
    }
}

