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
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

/**
 * User Model
 * Represents users (passengers, operators, admins)
 */
@Document(collection = "users")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User implements UserDetails {

    @Id
    private String id;

    @Indexed(unique = true)
    private String email;

    @Indexed(unique = true)
    private String phone;

    private String password;

    @Field("firstName")
    private String firstName;

    @Field("lastName")
    private String lastName;

    private LocalDateTime dateOfBirth;
    private String gender; // MALE, FEMALE, OTHER

    @Indexed
    private String role; // USER, OPERATOR, ADMIN, SUB_ADMIN

    private String subRole; // For sub-admins: SUPPORT, FINANCE, TECH, etc.

    @Builder.Default
    private Boolean isEmailVerified = false;
    @Builder.Default
    private Boolean isPhoneVerified = false;
    @Builder.Default
    private Boolean is2FAEnabled = false;
    private String twoFactorSecret;

    private String profileImage;

    private Address address;

    @Builder.Default
    private Wallet wallet = new Wallet();

    @Builder.Default
    private Integer loyaltyPoints = 0;
    @Builder.Default
    private String loyaltyTier = "BRONZE"; // BRONZE, SILVER, GOLD, PLATINUM

    @Indexed(unique = true)
    private String referralCode;

    private String referredBy;

    private List<SavedPassenger> savedPassengers;
    private List<SavedRoute> savedRoutes;
    private List<DeviceFingerprint> deviceFingerprints;

    @Builder.Default
    private Boolean isActive = true;
    @Builder.Default
    private Boolean isBlocked = false;
    private String blockedReason;

    private LocalDateTime lastLogin;
    private List<String> ipWhitelist; // For admin users

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;

    // UserDetails implementation
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + role));
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public boolean isAccountNonExpired() {
        return isActive && !isBlocked;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !isBlocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return isActive && !isBlocked;
    }

    // Nested classes
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Address {
        private String street;
        private String city;
        private String state;
        private String pincode;
        private String country = "India";
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Wallet {
        private Double balance = 0.0;
        private String currency = "INR";
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SavedPassenger {
        private String name;
        private Integer age;
        private String gender;
        private String idProof;
        private String idNumber;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SavedRoute {
        private String from;
        private String to;
        private String preferredTime;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class DeviceFingerprint {
        private String fingerprint;
        private String deviceInfo;
        private LocalDateTime lastUsed;
    }
}

