package com.busberry.service;

import com.busberry.dto.BusSearchResult;
import com.busberry.dto.SearchRequest;
import com.busberry.model.Bus;
import com.busberry.model.Route;
import com.busberry.model.User;
import com.busberry.repository.BusRepository;
import com.busberry.repository.RouteRepository;
import com.busberry.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SearchService {

    private final RouteRepository routeRepository;
    private final BusRepository busRepository;
    private final UserRepository userRepository;

    public List<BusSearchResult> searchBuses(SearchRequest request) {
        // Find routes by matching city names in from/to locations
        List<Route> allRoutes = routeRepository.findByIsActive(true);
        List<Route> routes = allRoutes.stream()
                .filter(route -> route.getFrom() != null && route.getTo() != null)
                .filter(route -> route.getFrom().getCity() != null && route.getTo().getCity() != null)
                .filter(route -> route.getFrom().getCity().equalsIgnoreCase(request.getFrom()) 
                        && route.getTo().getCity().equalsIgnoreCase(request.getTo()))
                .collect(Collectors.toList());

        return routes.stream()
                .filter(route -> route.getIsActive())
                .map(route -> {
                    String busId = route.getBusId();
                    if (busId == null) {
                        return null;
                    }
                    Bus bus = busRepository.findById(busId)
                            .orElse(null);
                    if (bus == null || !bus.getIsActive() || !bus.getIsApproved()) {
                        return null;
                    }

                    User operator = null;
                    String operatorId = route.getOperatorId();
                    if (operatorId != null) {
                        operator = userRepository.findById(operatorId)
                                .orElse(null);
                    }

                    return BusSearchResult.builder()
                            .busId(bus.getId())
                            .busName(bus.getBusName())
                            .operatorName(operator != null ? operator.getFirstName() + " " + operator.getLastName() : "Unknown")
                            .departureTime(route.getDepartureTime())
                            .arrivalTime(route.getArrivalTime())
                            .duration(formatDuration(route.getDuration()))
                            .availableSeats(calculateAvailableSeats(bus))
                            .price(calculatePrice(route, bus))
                            .rating(bus.getRating())
                            .amenities(bus.getAmenities())
                            .comfortScore(bus.getFeatures() != null ? bus.getFeatures().getComfortScore() : 5.0)
                            .routeId(route.getId())
                            .build();
                })
                .filter(result -> result != null)
                .collect(Collectors.toList());
    }

    private Integer calculateAvailableSeats(Bus bus) {
        if (bus.getSeatLayout() == null || bus.getSeatLayout().getSeats() == null) {
            return bus.getTotalSeats();
        }
        return (int) bus.getSeatLayout().getSeats().stream()
                .filter(seat -> seat.getIsAvailable())
                .count();
    }

    private Double calculatePrice(Route route, Bus bus) {
        Double basePrice = route.getBasePrice();
        if (route.getDynamicPricing() != null && route.getDynamicPricing().getEnabled()) {
            basePrice = basePrice * route.getDynamicPricing().getCurrentMultiplier();
        }
        return basePrice;
    }

    private String formatDuration(Integer minutes) {
        int hours = minutes / 60;
        int mins = minutes % 60;
        return hours + "h " + mins + "m";
    }
}

