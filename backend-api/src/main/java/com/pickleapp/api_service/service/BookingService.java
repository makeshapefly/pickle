package com.pickleapp.api_service.service;

import com.pickleapp.api_service.entity.Booking;
import com.pickleapp.api_service.entity.Member;
import com.pickleapp.api_service.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class BookingService {

    @Autowired
    BookingRepository repository;

    public ResponseEntity<Booking> createBooking(Booking booking) {
            try {
                repository.save(booking);
                return ResponseEntity.ok(booking);
            } catch (Exception ex) {
                return ResponseEntity.badRequest().build();
            }
    }
}
