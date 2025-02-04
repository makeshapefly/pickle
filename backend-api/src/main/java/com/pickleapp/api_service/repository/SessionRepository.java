package com.pickleapp.api_service.repository;

import com.pickleapp.api_service.entity.Session;
import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

public interface SessionRepository extends CrudRepository<Session, UUID> {

}
