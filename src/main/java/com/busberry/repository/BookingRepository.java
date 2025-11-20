package com.busberry.repository;

import com.busberry.model.Booking;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository extends MongoRepository<Booking, String> {
    Optional<Booking> findByBookingId(String bookingId);
    List<Booking> findByUserId(String userId);
    List<Booking> findByOperatorId(String operatorId);
    List<Booking> findByBusIdAndTripDate(String busId, LocalDate tripDate);
    List<Booking> findByRouteIdAndTripDate(String routeId, LocalDate tripDate);
    List<Booking> findByBookingStatus(String bookingStatus);
}

