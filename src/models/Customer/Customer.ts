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
    user: User
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
        name: customerApi.name,
        surname: customerApi.surname,
        phone: customerApi.phone,
        driverLicense: customerApi.driver_license,
        Insurance: customerApi.Insurance,
        address: customerApi.address,
        creditCards: customerApi.credit_cards
            ? customerApi.credit_cards.map(decodeCreditCard)
            : null,
        user: decodeUser(customerApi.user),
    };
};
export const decodeCustomers = (customerApi: CustomerApi[]): Customer[] => {
    return customerApi.map(decodeCustomer);
};