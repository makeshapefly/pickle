package com.pickleapp.api_service.repository;

import com.pickleapp.api_service.entity.Booking;
import org.springframework.data.repository.CrudRepository;

import java.util.Date;
import java.util.List;
import java.util.UUID;

public interface BookingRepository extends CrudRepository<Booking, UUID> {
    List<Booking> findBookingsBySessionIdAndSessionDate(UUID sessionId, Date sessionDate);
}
