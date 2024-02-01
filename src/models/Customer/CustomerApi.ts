import { UserApi, encodeUser } from "../User/UserApi"
import { Customer, creditCards } from "./Customer";

export interface creditCardsApi {
    number: string,
    expiry_date: string,
    holder_name: string,
    cvv: number
}

export interface CustomerApi {
    id: number,
    name: string,
    surname: string,
    phone: string,
    driver_license: string,
    Insurance: string,
    address: string,
    credit_cards: creditCardsApi[] | null,
    user: UserApi
}

export const encodeCreditCard = (creditCard: creditCards): creditCardsApi => {
    return {
        number: creditCard.number,
        expiry_date: creditCard.expiryDate,
        holder_name: creditCard.holderName,
        cvv: creditCard.cvv,
    };
};

export const encodeCustomer = (customer: Customer): CustomerApi => {
    return {
        id: customer.id,
        name: customer.name,
        surname: customer.surname,
        phone: customer.phone,
        driver_license: customer.driverLicense,
        Insurance: customer.Insurance,
        address: customer.address,
        credit_cards: customer.creditCards
            ? customer.creditCards.map(encodeCreditCard)
            : null,
        user: encodeUser(customer.user),
    };
};