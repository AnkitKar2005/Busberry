package com.busberry.service;

import com.busberry.dto.BookingRequest;
import com.busberry.dto.BookingResponse;
import com.busberry.model.Booking;
import com.busberry.model.Bus;
import com.busberry.model.Route;
import com.busberry.repository.BookingRepository;
import com.busberry.repository.BusRepository;
import com.busberry.repository.RouteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;
    private final RouteRepository routeRepository;
    private final BusRepository busRepository;

    public BookingResponse createBooking(BookingRequest request, String userId) {
        String routeId = request.getRouteId();
        if (routeId == null) {
            throw new RuntimeException("Route ID cannot be null");
        }
        Route route = routeRepository.findById(routeId)
                .orElseThrow(() -> new RuntimeException("Route not found"));

        String busId = request.getBusId();
        if (busId == null) {
            throw new RuntimeException("Bus ID cannot be null");
        }
        Bus bus = busRepository.findById(busId)
                .orElseThrow(() -> new RuntimeException("Bus not found"));

        // Generate booking ID
        String bookingId = "BB-" + LocalDate.now().toString().replace("-", "") + "-" + 
                          UUID.randomUUID().toString().substring(0, 6).toUpperCase();

        // Calculate total amount
        double totalAmount = request.getSeats().stream()
                .mapToDouble(seat -> calculateSeatPrice(bus, seat.getSeatNumber()))
                .sum();

        double discount = 0.0; // Apply coupon logic here
        double finalAmount = totalAmount - discount;

        Booking booking = Booking.builder()
                .bookingId(bookingId)
                .userId(userId)
                .operatorId(route.getOperatorId())
                .busId(request.getBusId())
                .routeId(request.getRouteId())
                .tripDate(request.getTripDate())
                .seats(request.getSeats().stream().map(seat -> Booking.SeatBooking.builder()
                        .seatNumber(seat.getSeatNumber())
                        .passengerName(seat.getPassengerName())
                        .passengerAge(seat.getPassengerAge())
                        .passengerGender(seat.getPassengerGender())
                        .idProof(seat.getIdProof())
                        .idNumber(seat.getIdNumber())
                        .price(calculateSeatPrice(bus, seat.getSeatNumber()))
                        .build()).collect(Collectors.toList()))
                .totalAmount(totalAmount)
                .discount(discount)
                .couponCode(request.getCouponCode())
                .finalAmount(finalAmount)
                .paymentStatus("PENDING")
                .bookingStatus("CONFIRMED")
                .qrCode("QR_" + bookingId) // Generate actual QR code
                .build();

        booking = Objects.requireNonNull(booking, "Booking must not be null");
        Booking savedBooking = bookingRepository.save(booking);

        return mapToResponse(savedBooking);
    }

    public BookingResponse getBooking(String bookingId) {
        Booking booking = bookingRepository.findByBookingId(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        return mapToResponse(booking);
    }

    public List<BookingResponse> getUserBookings(String userId) {
        return bookingRepository.findByUserId(userId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public BookingResponse cancelBooking(String bookingId, String reason, String userId) {
        Booking booking = bookingRepository.findByBookingId(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        if (!booking.getUserId().equals(userId)) {
            throw new RuntimeException("Unauthorized");
        }

        booking.setBookingStatus("CANCELLED");
        booking.setCancellationReason(reason);
        booking.setCancelledAt(LocalDateTime.now());
        booking.setRefundStatus("PENDING");

        booking = bookingRepository.save(booking);
        return mapToResponse(booking);
    }

    private double calculateSeatPrice(Bus bus, String seatNumber) {
        // Simple price calculation - can be enhanced
        return 1000.0; // Default price
    }

    private BookingResponse mapToResponse(Booking booking) {
        return BookingResponse.builder()
                .id(booking.getId())
                .bookingId(booking.getBookingId())
                .userId(booking.getUserId())
                .busId(booking.getBusId())
                .routeId(booking.getRouteId())
                .tripDate(booking.getTripDate())
                .seats(booking.getSeats().stream().map(seat -> BookingResponse.SeatInfo.builder()
                        .seatNumber(seat.getSeatNumber())
                        .passengerName(seat.getPassengerName())
                        .price(seat.getPrice())
                        .build()).collect(Collectors.toList()))
                .totalAmount(booking.getTotalAmount())
                .discount(booking.getDiscount())
                .finalAmount(booking.getFinalAmount())
                .paymentStatus(booking.getPaymentStatus())
                .bookingStatus(booking.getBookingStatus())
                .qrCode(booking.getQrCode())
                .ticketPdf(booking.getTicketPdf())
                .createdAt(booking.getCreatedAt())
                .build();
    }
}

