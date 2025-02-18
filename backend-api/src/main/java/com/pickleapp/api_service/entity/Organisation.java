package com.pickleapp.api_service.entity;

import jakarta.persistence.*;

import java.util.Date;
import java.util.Set;

@Entity
public class Organisation {

    @Id
    @GeneratedValue(strategy= GenerationType.SEQUENCE)
    private long id;

    private String orgName;

    private String joinCode;

    private Date createdAt;

    //@ManyToMany(mappedBy = "organisations")
    //Set<Member> members;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getOrgName() {
        return orgName;
    }

    public void setOrgName(String orgName) {
        this.orgName = orgName;
    }

    public String getJoinCode() {
        return joinCode;
    }

    public void setJoinCode(String joinCode) {
        this.joinCode = joinCode;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    /*public Set<Member> getMembers() {
        return members;
    }

    public void setMembers(Set<Member> members) {
        this.members = members;
    }*/
}

