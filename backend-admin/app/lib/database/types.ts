import { Generated, Selectable, Insertable, Updateable } from "kysely";

export interface Database {
  users: UsersTable;
  organisation: OrganisationTable;
  role: RoleTable;
  member: MemberTable;
  session: SessionTable;
  organisation_member: OrganisationembersTable;
}

export interface UsersTable {
  id: Generated<string>;
  first_name: string;
  last_name: string;
  email: string;
  organisation: number;
  created_at: Date;
}

export interface OrganisationTable {
  id: number;
  org_name: string;
  created_at: Date;
  join_code: string;
}

export interface RoleTable {
  id: Generated<string>;
  role: string;
  user_id: string;
}

export interface SessionTable {
  id: Generated<string>;
  name: string;
  recurring: boolean,
  startDate: Date,
  endDate: Date,
  sessionDate: Date,
  days: string[],
  price: number,
  config: JSON,
  organisation_id: number;
  created_at: Date;
}

export interface MemberTable {
  id: string;
  mobile_phone: string;
  email: string;
  first_name: string;
  last_name: string;
  organisation: number;
  created_at: Date;
}

export class Member {
  id: string;
  mobile_phone: string;
  email: string;
  first_name: string;
  last_name: string;
  organisation: number;
  created_at: Date;
  constructor({ id, mobile_phone, email, first_name, last_name, organisation, created_at }: MemberTable) {
    this.id = id;
    this.mobile_phone = mobile_phone;
    this.email = email;
    this.first_name = first_name;
    this.last_name = last_name;
    this.organisation = organisation;
    this.created_at = created_at;
  }
}

export class OrganisationModel {
  id: number;
  org_name: string;
  created_at: Date;
  constructor({ id, org_name, created_at }: OrganisationTable) {
    this.id = id;
    this.org_name = org_name;
    this.created_at = created_at;
  }
}

export interface OrganisationembersTable {
  organisation_id: number;
  member_id: string;
}

export interface OrganisationWithMembersModelData extends OrganisationTable {
  members: MemberTable[];
}

export class OrganisationWithMembers extends OrganisationModel {
  members: Member[];
  constructor(organisationTable: OrganisationWithMembersModelData) {
    super(organisationTable);
    this.members = organisationTable.members.map((memberData) => {
      return new Member(memberData);
    });
  }
}

export type Organisation = Selectable<OrganisationTable>
export type NewOrganisation = Insertable<OrganisationTable>
export type OrganisationUpdate = Updateable<OrganisationTable>

export type User = Selectable<UsersTable>
export type NewUser = Insertable<UsersTable>
export type UserUpdate = Updateable<UsersTable>

export type Role = Selectable<RoleTable>
export type NewRole = Insertable<RoleTable>
export type RoleUpdate = Updateable<RoleTable>

export type MemberType = Selectable<MemberTable>
export type NewMemberType = Insertable<MemberTable>
export type MemberUpdateType = Updateable<MemberTable>

export type Session = Selectable<SessionTable>
export type NewSessionType = Insertable<SessionTable>
export type SessionUpdateType = Updateable<SessionTable>