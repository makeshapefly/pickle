package com.pickleapp.api_service.service;

import com.pickleapp.api_service.entity.Session;
import com.pickleapp.api_service.repository.SessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

}
