package com.pickleapp.api_service.controller;
import com.pickleapp.api_service.entity.Member;
import com.pickleapp.api_service.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequestMapping("/member")
@CrossOrigin
public class MemberController {

    @Autowired
    MemberService service;

    @GetMapping("/all")
    public Iterable<Member> getAllMembers() {
        return service.getAllMembers();
    }

    @GetMapping("/")
    @CrossOrigin
    public ResponseEntity<Member> getMemberByPhone(@AuthenticationPrincipal Jwt principal) {
        String phone = principal.getClaim("phone_number");
        Member member = null;
        if (phone != null) {
            member = service.getMemberByPhone(phone);
        }

        if (member == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(member);
    }

    @PostMapping("/")
    public ResponseEntity<Member> newMember(@RequestBody Member newMember, @AuthenticationPrincipal Jwt principal) {
        newMember.setCreatedAt(new Date());
        newMember.setMobilePhone(principal.getClaim("phone_number"));
        String response = service.createNewMember(newMember);
        if (response.equals("ok")) {
            return ResponseEntity.ok(newMember);
        }
        return ResponseEntity.badRequest().build();
    }
}
