package com.pickleapp.api_service.controller;

import com.pickleapp.api_service.entity.Member;
import com.pickleapp.api_service.entity.Session;
import com.pickleapp.api_service.service.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequestMapping("/session")
public class SessionController {

    @Autowired
    SessionService service;

    @PostMapping("/")
    public ResponseEntity<Session> newMember(@RequestBody Session newSession, @AuthenticationPrincipal Jwt principal) {
        newSession.setCreatedAt(new Date());

        String response = service.createNewSession(newSession);
        if (response.equals("ok")) {
            return ResponseEntity.ok(newSession);
        }
        return ResponseEntity.badRequest().build();
    }
}
