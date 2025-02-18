package com.pickleapp.api_service.controller;

import com.pickleapp.api_service.dto.AvailableSession;
import com.pickleapp.api_service.entity.Member;
import com.pickleapp.api_service.entity.Organisation;
import com.pickleapp.api_service.entity.Session;
import com.pickleapp.api_service.service.MemberService;
import com.pickleapp.api_service.service.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/session")
public class SessionController {

    @Autowired
    SessionService service;

    @Autowired
    MemberService memberService;

    @GetMapping("/")
    public ResponseEntity<Map<String, List<Session>>> getSessionsByOrg(@AuthenticationPrincipal Jwt principal) {
        String phone = principal.getClaim("phone_number");
        Member member = memberService.getMemberByPhone(phone);

        if (member != null) {
            Set<Organisation> orgs = member.getOrganisations();
            if (orgs != null) {
                Map<String, List<Session>> sessionsByOrg = new HashMap<String, List<Session>>();
                Iterator<Organisation> iterator = orgs.iterator();
                while(iterator.hasNext()) {
                    Organisation org = iterator.next();
                    List<Session> sessions = service.getSessionsByOrg(org.getId());
                    sessionsByOrg.put(org.getOrgName(), sessions);
                }
                return ResponseEntity.ok(sessionsByOrg);
            }
        }
        return ResponseEntity.badRequest().build();
    }

    @GetMapping("/available")
    public ResponseEntity<List<AvailableSession>> getAvailableSessions(@AuthenticationPrincipal Jwt principal) {
        String phone = principal.getClaim("phone_number");
        Member member = memberService.getMemberByPhone(phone);

        Map<String, List<Session>> sessionsByOrg = new HashMap<String, List<Session>>();

        try {
            if (member != null) {
                Set<Organisation> orgs = member.getOrganisations();
                System.out.println("orgs: " + orgs);
                if (orgs != null) {
                    Iterator<Organisation> iterator = orgs.iterator();
                    while (iterator.hasNext()) {
                        Organisation org = iterator.next();
                        System.out.println("org.getId(): " + org.getId());
                        List<Session> sessions = service.getSessionsByOrg(org.getId());
                        System.out.println("sessions: " + sessions.size());
                        sessionsByOrg.put(org.getOrgName(), sessions);
                    }
                }
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }

        //call sessions service to get available sessions per org
        List<AvailableSession> availableSessions = service.getAvailableSessions(sessionsByOrg);

        return ResponseEntity.ok(availableSessions);
    }

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
