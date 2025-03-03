package com.pickleapp.api_service.service;

import com.pickleapp.api_service.dto.BookedSession;
import com.pickleapp.api_service.entity.Booking;
import com.pickleapp.api_service.entity.Member;
import com.pickleapp.api_service.entity.Session;
import com.pickleapp.api_service.repository.BookingRepository;
import com.pickleapp.api_service.repository.SessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;

@Service
public class BookingService {

    @Autowired
    BookingRepository repository;

    @Autowired
    SessionRepository sessionRepository;

    public ResponseEntity<Booking> createBooking(Booking booking) {
            try {
                repository.save(booking);
                return ResponseEntity.ok(booking);
            } catch (Exception ex) {
                return ResponseEntity.badRequest().build();
            }
    }

    public ResponseEntity<List<BookedSession>> getBookings(UUID memberId) {
        try {
             List<Booking> bookings = repository.findBookingsByMemberId(memberId);
            List<BookedSession> sessions = new ArrayList<BookedSession>();
             for (Booking booking: bookings) {
                 UUID sessionId = booking.getSessionId();
                 Optional<Session> session = sessionRepository.findById(sessionId);
                 Session value = session.get();
                 if (value != null) {
                     BookedSession bookedSession = new BookedSession();
                     bookedSession.setId(value.getId());
                     bookedSession.setName(value.getName());
                     bookedSession.setLocation(value.getLocation());
                     bookedSession.setPrice(value.getPrice());
                     bookedSession.setPeople(value.getPeople());
                     Date sessionDate = booking.getSessionDate();
                     LocalDateTime sessionStartDateTime = Instant.ofEpochMilli(value.getStartDate().getTime())
                             .atZone(ZoneId.systemDefault())
                             .toLocalDateTime();

                     LocalDateTime sessionEndDateTime = Instant.ofEpochMilli(value.getEndDate().getTime())
                             .atZone(ZoneId.systemDefault())
                             .toLocalDateTime();

                     LocalDateTime bookingStartDateTime = Instant.ofEpochMilli(booking.getSessionDate().getTime())
                             .atZone(ZoneId.systemDefault())
                             .toLocalDateTime();

                     LocalDateTime bookingEndDateTime = Instant.ofEpochMilli(booking.getSessionDate().getTime())
                             .atZone(ZoneId.systemDefault())
                             .toLocalDateTime();

                     int startHr = sessionStartDateTime.getHour();
                     int startMin = sessionStartDateTime.getMinute();
                     int endHr = sessionEndDateTime.getHour();
                     int endMin = sessionEndDateTime.getMinute();

                     LocalDateTime bookedStartDateAndTime = LocalDateTime.of(bookingStartDateTime.getYear(), bookingStartDateTime.getMonth(), bookingStartDateTime.getDayOfMonth(), startHr, startMin);
                     LocalDateTime bookedEndDateAndTime = LocalDateTime.of(bookingEndDateTime.getYear(), bookingEndDateTime.getMonth(), bookingEndDateTime.getDayOfMonth(), endHr, endMin);

                     bookedSession.setStartDate(bookedStartDateAndTime);
                     bookedSession.setEndDate(bookedEndDateAndTime);
                     sessions.add(bookedSession);
                 }
             }
            return ResponseEntity.ok(sessions);
        } catch (Exception ex) {
            return ResponseEntity.badRequest().build();
        }

    }
}
