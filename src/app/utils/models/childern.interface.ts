import { IRoleAuthorizationSettings } from "./role-authorization-settings.interface"

export interface IChildern{
    roleId: Number,
    authorizationId: string,
    agency: string,
    parentId: string,
    accessLevel: string,
    description: string,
    isAccess: true,
    canAccess: true,
    canView: true,
    canAdd: true,
    canUpdate: true,
    canDelete: true,
    roleAuthorizationSettings: IRoleAuthorizationSettings[]
}