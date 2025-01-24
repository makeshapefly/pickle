package com.pickleapp.api_service.service;

import com.pickleapp.api_service.entity.Member;
import com.pickleapp.api_service.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class MemberService {

    @Autowired
    MemberRepository repository;

    public Iterable<Member> getAllMembers() {
        return repository.findAll();
    }
    public Member getMemberByPhone(String phone) {
        return repository.findByMobilePhone(phone);
    }

    public String createNewMember(Member member) {
        try {
            repository.save(member);
            return "ok";
        } catch (Exception ex) {
            return "error";
        }
    }
}
