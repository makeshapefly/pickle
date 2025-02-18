package com.pickleapp.api_service.dto;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.UUID;

public class AvailableSession {

    private UUID id;
    private String name;
    private String location;
    private LocalDateTime startDate;
    private LocalDateTime endDate;

    private int bookings; //no of people booked

    private int maxNo; //max number if people session can accommodate

    private boolean isBookableNow;

    private float price;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public LocalDateTime getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDateTime startDate) {
        this.startDate = startDate;
    }

    public LocalDateTime getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDateTime endDate) {
        this.endDate = endDate;
    }

    public int getBookings() {
        return bookings;
    }

    public void setBookings(int bookings) {
        this.bookings = bookings;
    }

    public int getMaxNo() {
        return maxNo;
    }

    public void setMaxNo(int maxNo) {
        this.maxNo = maxNo;
    }

    public boolean isBookableNow() {
        return isBookableNow;
    }

    public void setBookableNow(boolean bookableNow) {
        isBookableNow = bookableNow;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }
}
