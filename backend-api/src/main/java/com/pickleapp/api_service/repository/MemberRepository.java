package com.pickleapp.api_service.repository;

import com.pickleapp.api_service.entity.Member;import org.springframework.data.repository.CrudRepository;
import java.util.UUID;

public interface MemberRepository extends CrudRepository<Member, UUID> {

    Member findByMobilePhone(String phone);
}
