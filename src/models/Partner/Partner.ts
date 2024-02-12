import { PartnerApi } from "./PartnerApi";



export interface Partner {
    id: number,
    name: string,
    surname: string,
    phone: string,
    address: string,
    // user: User
}



export const decodePartner = (PartnerApi: PartnerApi): Partner => {
    return {
        id: PartnerApi.id,
        name: PartnerApi.name,
        surname: PartnerApi.surname,
        phone: PartnerApi.phone,
        address: PartnerApi.address,
        // user: decodeUser(PartnerApi.user),
    };
};
export const decodePart = (PartnerApi): Partner => {
    return {
        id: PartnerApi.id,
        name: PartnerApi.attributes.name,
        surname: PartnerApi.attributes.surname,
        phone: PartnerApi.attributes.phone,
        address: PartnerApi.attributes.address,
        // user: decodeUser(PartnerApi.user),
    };
};
export const decodePartners = (partnerApi: PartnerApi[]): Partner[] => {
    return partnerApi.map(decodePartner);
};