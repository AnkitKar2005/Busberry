package com.busberry.repository;

import com.busberry.model.Route;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RouteRepository extends MongoRepository<Route, String> {
    List<Route> findByOperatorId(String operatorId);
    List<Route> findByBusId(String busId);
    List<Route> findByIsActive(boolean isActive);
    
    // Note: MongoDB query for nested fields - keeping for reference
    // List<Route> findByFromCityAndToCity(String fromCity, String toCity);
}

