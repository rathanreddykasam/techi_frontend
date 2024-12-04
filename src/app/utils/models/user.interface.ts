import { IUserRoles } from "./user-roles.interface"

export interface IUser {
  id: Number,
  agency: string,
  userId: string,
  department: string,
  section: string,
  class: string,
  temporaryPassword: string,
  securityCoordinatorRetrainingDate: string,
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string,
  phoneNumberExtension: string,
  userAgreementDate: string,
  defaultPrinter: string,
  maxConcurrentLogons: Number,
  terminalGroup: string,
  authorizationGroup: string,
  copyAuthorizationFrom: string,
  ipGroup: string,
  activeDateTime: string,
  inactiveDateTime: string,
  soapAccessWithoutPassword: string,
  isLocked: boolean,
  userRoles: IUserRoles[]
}

