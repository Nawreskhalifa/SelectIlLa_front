import { User, decodeUser } from "../User/User"
import { CustomerApi, creditCardsApi } from "./CustomerApi";

export interface creditCards {
    number: string,
    expiryDate: string,
    holderName: string,
    cvv: number
}

export interface Customer {
    id: number,
    name: string,
    surname: string,
    phone: string,
    driverLicense: string,
    Insurance: string,
    address: string,
    creditCards: creditCards[] | null,
    user: User | null
}

export const decodeCreditCard = (creditCardApi: creditCardsApi): creditCards => {
    return {
        number: creditCardApi.number,
        expiryDate: creditCardApi.expiry_date,
        holderName: creditCardApi.holder_name,
        cvv: creditCardApi.cvv,
    };
};

export const decodeCustomer = (customerApi: CustomerApi): Customer => {
    return {
        id: customerApi.id,
        name: customerApi.attributes.name,
        surname: customerApi.attributes.surname,
        phone: customerApi.attributes.phone,
        driverLicense: customerApi.attributes.driver_license,
        Insurance: customerApi.attributes.Insurance,
        address: customerApi.attributes.address,
        creditCards: customerApi.attributes.credit_cards
            ? customerApi.attributes.credit_cards.map(decodeCreditCard)
            : null,
         user: decodeUser(customerApi.attributes.user),
    };
};
export const decodeCustomers = (customerApi: CustomerApi[]): Customer[] => {
    return customerApi.map(decodeCustomer);
};