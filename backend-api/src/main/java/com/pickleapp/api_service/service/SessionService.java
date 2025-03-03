package com.pickleapp.api_service.service;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.pickleapp.api_service.dto.AvailableSession;
import com.pickleapp.api_service.entity.Booking;
import com.pickleapp.api_service.entity.Session;
import com.pickleapp.api_service.repository.BookingRepository;
import com.pickleapp.api_service.repository.SessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;

@Service
public class SessionService {

    @Autowired
    SessionRepository repository;

    @Autowired
    BookingRepository bookingRepository;

    public String createNewSession(Session session) {
        try {
            repository.save(session);
            return "ok";
        } catch (Exception ex) {
            return "error";
        }
    }

    public List<Session> getSessionsByOrg(long orgId) {
        try {
            return repository.findByOrganisationId(orgId);
        } catch (Exception ex) {
            ex.printStackTrace();
            return new ArrayList<Session>();
        }
    }

    public List<AvailableSession> getAvailableSessions(UUID memberId, Map<String, List<Session>> sessionsByOrg) {
        List<AvailableSession> availableSessions = new ArrayList<AvailableSession>();

        for (String i : sessionsByOrg.keySet()) {
            //System.out.println("key: " + i + " value: " + availableSessions.get(i));
            List<Session> sessions = sessionsByOrg.get(i);
            for(Session session : sessions) {
                LocalDateTime startDate = Instant.ofEpochMilli(session.getStartDate().getTime())
                        .atZone(ZoneId.systemDefault())
                        .toLocalDateTime();
                System.out.println("startDate: " + startDate);
                LocalDateTime endDate = Instant.ofEpochMilli(session.getEndDate().getTime())
                        .atZone(ZoneId.systemDefault())
                        .toLocalDateTime();
                System.out.println("endDate: " + endDate);
                LocalDateTime today = LocalDateTime.now();
                int startHr = startDate.getHour();
                int startMin = startDate.getMinute();
                int endHr = endDate.getHour();
                int endMin = endDate.getMinute();

                //get config
                String config = session.getConfig();
                JsonParser parser = new JsonParser();
                JsonObject JSONObject = parser.parse(config).getAsJsonObject();
                Integer window = JSONObject.get("window").getAsInt();
                Integer windowClose = JSONObject.get("windowClose") != null ? JSONObject.get("windowClose").getAsInt(): 2;

                //is populate to date 6 months or before
                LocalDateTime sessionStartDateAndTimeForWindow = LocalDateTime.of(today.getYear(), today.getMonth(), today.getDayOfMonth(), startHr, startMin);
                LocalDateTime populateToDate = endDate.isBefore(sessionStartDateAndTimeForWindow) ? startDate : sessionStartDateAndTimeForWindow.plusDays(window);
                populateToDate = populateToDate.withHour(23);
                LocalDateTime sessionEndDateAndTimeForWindow = LocalDateTime.of(today.getYear(), today.getMonth(), today.getDayOfMonth(), endHr, endMin);
                System.out.println("sessionStartDateAndTime: " + sessionStartDateAndTimeForWindow);
                System.out.println("sessionEndDateAndTime: " + sessionEndDateAndTimeForWindow);
                System.out.println("populateToDate: " + populateToDate);

                while (today.isBefore(populateToDate)) {
                    System.out.println("************************************");
                    AvailableSession availableSession = new AvailableSession();
                    DayOfWeek dayOfWeek = today.getDayOfWeek();
                    System.out.println("dayOfWeek: " + dayOfWeek);
                    System.out.println("dayOfWeek.name().toLowerCase(): " + dayOfWeek.name().toLowerCase());

                    //int day = dayOfWeek.getValue(); //int value 1 - 7
                    String[] days = session.getDays();
                    List daysList = Arrays.asList(days);
                    System.out.println("daysList: " + daysList);
                    if (daysList.contains(dayOfWeek.name().toLowerCase())) {
                        System.out.println("availableSession: " + availableSession);
                        availableSession.setId(session.getId());
                        availableSession.setName(session.getName());
                        availableSession.setLocation(session.getLocation());

                        //set time of session
                        LocalDateTime sessionStartDateAndTime = LocalDateTime.of(today.getYear(), today.getMonth(), today.getDayOfMonth(), startHr, startMin);
                        LocalDateTime sessionEndDateAndTime = LocalDateTime.of(today.getYear(), today.getMonth(), today.getDayOfMonth(), endHr, endMin);
                        System.out.println("sessionStartDateAndTime: " + sessionStartDateAndTime);
                        System.out.println("sessionEndDateAndTime: " + sessionEndDateAndTime);

                        //get number of bookings
                        List<Booking> bookingsList = bookingRepository.findBookingsBySessionIdAndSessionDate(session.getId(), Date.from(sessionStartDateAndTime.atZone(ZoneId.systemDefault()).toInstant()));
                        availableSession.setBookings(bookingsList.size());
                        boolean callerBookedOn = false;
                        for (Booking booking: bookingsList) {
                            if (booking.getMemberId().equals(memberId)) {
                                callerBookedOn = true;
                            }
                        }

                        availableSession.setPeople(session.getPeople());
                        //work out if bookable
                        LocalDateTime windowDate = sessionStartDateAndTime.minusDays(window);
                        LocalDateTime windowCloseDate = sessionStartDateAndTime.minusHours(windowClose);
                        System.out.println("windowDate: " + windowDate);
                        System.out.println("today: " + today);
                        if (LocalDateTime.now().isAfter(windowDate) && LocalDateTime.now().isBefore(windowCloseDate)) {
                            availableSession.setBookableNow(true);
                        }

                        if (availableSession.getBookings() >= availableSession.getPeople()) {
                            availableSession.setBookableNow(false);
                            availableSession.setFullyBooked(true);
                        }

                        if (callerBookedOn) {
                            availableSession.setBookableNow(false);
                        }

                        availableSession.setStartDate(sessionStartDateAndTime);
                        availableSession.setEndDate(sessionEndDateAndTime);
                        availableSession.setPrice(session.getPrice());
                    }

                    //if (availableSession.isBookableNow()) {
                        availableSessions.add(availableSession);
                    //}
                    today = today.plusDays(1);
                    System.out.println("************************************");
                }
            }
        }

        return availableSessions;

    }

    public Optional<Session> getSessionsById(UUID sessionId) {
        return repository.findById(sessionId);
    }
}
