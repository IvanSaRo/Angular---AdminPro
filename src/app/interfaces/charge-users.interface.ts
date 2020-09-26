import { User } from '../models/user.model';


export interface chargeUser{

    total: number;
    users: User[];
}