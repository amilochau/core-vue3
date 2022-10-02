import { AccessLevel } from "./maps";

export class InvitationsListResponse {
  id: string = '';
  userName: string = '';
  userEmail?: string;
  accessLevel: AccessLevel = AccessLevel.None;
}

export class InvitationsCreateRequest {
  userName: string = '';
  userEmail: string = '';
  accessLevel: AccessLevel = AccessLevel.Read;
}

export class InvitationsDetailsResponse {
  id: string = '';
  mapName: string = '';
  mapDesc?: string;
  senderName?: string;
  accessLevel: AccessLevel = AccessLevel.None;
}

export class InvitationsVerifyRequest {
  activationCode: string = '';
}

export enum InvitationsOrderTypes {
  Default = 0
}
