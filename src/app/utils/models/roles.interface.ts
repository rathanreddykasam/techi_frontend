import { IRoleAuthorizationSettings } from "./role-authorization-settings.interface";

export interface IRoles{
  id: Number,
  agency: string,
  description: string,
  roleAuthorizationSettings: IRoleAuthorizationSettings[]
}