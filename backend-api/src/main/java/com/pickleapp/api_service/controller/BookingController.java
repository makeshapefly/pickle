package com.pickleapp.api_service.controller;

import com.pickleapp.api_service.dto.BookedSession;
import com.pickleapp.api_service.entity.Booking;
import com.pickleapp.api_service.entity.Member;
import com.pickleapp.api_service.service.BookingService;
import com.pickleapp.api_service.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/booking")
@CrossOrigin
public class BookingController {

    @Autowired
    MemberService memberService;

    @Autowired
    BookingService service;

    @PutMapping("/")
    public ResponseEntity<Booking> updateBooking(@RequestBody Booking updateBooking, @AuthenticationPrincipal Jwt principal) {
        String phone = principal.getClaim("phone_number");
        Member member = memberService.getMemberByPhone(phone);

        System.out.println(updateBooking.getSessionDate());

        updateBooking.setMemberId(member.getId());
        updateBooking.setCreatedAt(new Date());
        return service.createBooking(updateBooking);
    }

    @GetMapping("/")
    public ResponseEntity<List<BookedSession>> getBookings(@AuthenticationPrincipal Jwt principal) {
        String phone = principal.getClaim("phone_number");
        Member member = memberService.getMemberByPhone(phone);
        if (member != null) {
            return service.getBookings(member.getId());
        }

        return ResponseEntity.notFound().build();
    }
}
