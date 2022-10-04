import { AccessLevel } from "./maps";
import { User } from "./users";

export class AccessesListResponse {
  id: string = '';
  user: User = new User();
  accessLevel: AccessLevel = AccessLevel.None;
}

export enum AccessesOrderTypes {
  Default = 0
}
