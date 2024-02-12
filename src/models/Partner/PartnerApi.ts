

export interface PartnerApi {
    id: number,
    attributes: {
        name: string,
        surname: string,
        phone: string,
        address: string,
    };

}


// export const encodePartner = (Partner: Partner): PartnerApi => {
//     return {
//         id: Partner.id,
//         attributes: {

//         }
//         name: Partner.name,
//         surname: Partner.surname,
//         phone: Partner.phone,
//         address: Partner.address,
//         user: encodeUser(Partner.user),
//     };
// };