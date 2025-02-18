package com.pickleapp.api_service.service;

import com.pickleapp.api_service.dto.AvailableSession;
import com.pickleapp.api_service.entity.Session;
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
            //System.out.println("repository.findByOrganisationId(orgId): " + repository.findByOrganisationId(orgId));
            return repository.findByOrganisationId(orgId);
        } catch (Exception ex) {
            ex.printStackTrace();
            return new ArrayList<Session>();
        }
    }

    public List<AvailableSession> getAvailableSessions(Map<String, List<Session>> sessionsByOrg) {
        /*Map<String, Integer> daysMapper = new HashMap<String, Integer>();
        daysMapper.put("sunday", 7);
        daysMapper.put("monday", 1);
        daysMapper.put("tuesday", 2);
        daysMapper.put("wednesday", 3);
        daysMapper.put("thursday", 4);
        daysMapper.put("friday", 5);
        daysMapper.put("saturday", 6);*/

        Map<Integer, String> daysMapper = new HashMap<Integer, String>();
        daysMapper.put(7,"SUNDAY");
        daysMapper.put(1, "monday".toUpperCase());
        daysMapper.put(2, "tuesday".toUpperCase());
        daysMapper.put(3,"wednesday".toUpperCase());
        daysMapper.put(4, "thursday".toUpperCase());
        daysMapper.put(5,"friday".toUpperCase());
        daysMapper.put(6, "saturday".toUpperCase());

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
                LocalDateTime sixMonthsAhead = today.plusMonths(6);
                System.out.println("sixMonthsAhead: " + sixMonthsAhead);

                //is populate to date 6 months or before
                LocalDateTime populateToDate = endDate.isBefore(sixMonthsAhead) ? endDate : sixMonthsAhead;
                System.out.println("populateToDate: " + populateToDate);

                while (today.isBefore(populateToDate)) {
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

                        //set time of session
                        LocalDateTime sessionStartDateAndTime = LocalDateTime.of(today.getYear(), today.getMonth(), today.getDayOfMonth(), startHr, startMin);
                        LocalDateTime sessionEndDateAndTime = LocalDateTime.of(today.getYear(), today.getMonth(), today.getDayOfMonth(), endHr, endMin);

                        availableSession.setStartDate(sessionStartDateAndTime);
                        availableSession.setEndDate(sessionEndDateAndTime);
                        availableSession.setPrice(session.getPrice());
                    }
                    availableSessions.add(availableSession);
                    today = today.plusDays(1);
                }
            }
        }

        return availableSessions;

    }

}
