import { UserApi, encodeUser } from "../User/UserApi"
import { Partner } from "./Partner";


export interface PartnerApi {
    id: number,
    name: string,
    surname: string,
    phone: string,
    address: string,
    user: UserApi
}


export const encodePartner = (Partner: Partner): PartnerApi => {
    return {
        id: Partner.id,
        name: Partner.name,
        surname: Partner.surname,
        phone: Partner.phone,
        address: Partner.address,
        user: encodeUser(Partner.user),
    };
};