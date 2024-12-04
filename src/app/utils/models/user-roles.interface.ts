import { IChildern } from "./childern.interface"

export interface IUserRoles{
    userId: Number,
    roleId: Number,
    children: IChildern[]

}