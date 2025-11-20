package com.busberry.repository;

import com.busberry.model.Bus;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BusRepository extends MongoRepository<Bus, String> {
    List<Bus> findByOperatorId(String operatorId);
    List<Bus> findByIsActiveAndIsApproved(boolean isActive, boolean isApproved);
    Optional<Bus> findByBusNumber(String busNumber);
}

