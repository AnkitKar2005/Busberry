package com.busberry.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private String id;
    private String email;
    private String phone;
    private String firstName;
    private String lastName;
    private String role;
    private String subRole;
    private Boolean isEmailVerified;
    private Boolean isPhoneVerified;
    private String profileImage;
    private Integer loyaltyPoints;
    private String loyaltyTier;
    private LocalDateTime createdAt;
}

