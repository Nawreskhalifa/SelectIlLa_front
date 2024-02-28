import { User, decodeUser } from "../User/User";
import { PartnerApi } from "./PartnerApi";



export interface Partner {
    id: number,
    name: string,
    surname: string,
    phone: string,
    address: string,
    user: User|null
}



export const decodePartner = (PartnerApi): Partner => {
    return {
        id: PartnerApi.id,
        name: PartnerApi.attributes.name,
        surname: PartnerApi.attributes.surname,
        phone: PartnerApi.attributes.phone,
        address: PartnerApi.attributes.address,
        user: null,
    };
};
export const decodePart = (PartnerApi): Partner => {
    return {
        id: PartnerApi.id,
        name: PartnerApi.attributes.name,
        surname: PartnerApi.attributes.surname,
        phone: PartnerApi.attributes.phone,
        address: PartnerApi.attributes.address,
        user: decodeUser(PartnerApi.attributes.user),
    };
};
export const decodePartners = (partnerApi: PartnerApi[]): Partner[] => {
    return partnerApi.map(decodePartner);
};