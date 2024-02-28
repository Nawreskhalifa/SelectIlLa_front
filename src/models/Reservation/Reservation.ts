import { Customer, decodeCreditCard, decodeCustomer } from "../Customer/Customer";
import { Vehicle, decodeApiToVehicle } from "../Vehicle/Vehicle";
import { Villa, decodeApiToVilla } from "../Villa/Villa";
import { Event, decodeApiToEvent } from "../Event/Event";
import { DocumentApi, ReservationApi } from "./ReservationApi";
export interface CreditCard {
    number: string,
    expiryDate: string,
    holderName: string,
    cvv: number
}
export interface Document {
    id: number;
    name: string;
    url: string;
}
export interface Reservation {
    pickupDate: string | null;
    pickupTime: string | null;
    dropOffDate: string | null;
    dropOffTime: string | null;
    pickupLocation: string | null;
    dropOffLocation: string | null;
    customer: Customer;
    tax: number | null;
    totalAmount: number;
    addedAmount: number;
    status: string;
    rejectionReason: string | null;
    vehicle: Vehicle | null;
    villa: Villa | null;
    event: Event | null;
    seats: number | null;
    bottles: number | null;
    creditCard: CreditCard;
    documents: Document[] | null;
    phone: string | null;
}

export const decodeDocument = (documentApi: DocumentApi): Document => {
    return {
        id: documentApi.id,
        name: documentApi.name,
        url: documentApi.url,
    };
};
export const decodeApiToReservation = (reservationApi: ReservationApi): Reservation => {
    return {
        pickupDate: reservationApi.pickup_date,
        pickupTime: reservationApi.pickup_time,
        dropOffDate: reservationApi.drop_off_date,
        dropOffTime: reservationApi.drop_off_time,
        pickupLocation: reservationApi.pickup_location,
        dropOffLocation: reservationApi.drop_off_location,
        customer: decodeCustomer(reservationApi.customer),
        tax: reservationApi.tax,
        totalAmount: reservationApi.total_amount,
        addedAmount: reservationApi.added_amount,
        status: reservationApi.status,
        rejectionReason: reservationApi.rejection_reason,
        vehicle: reservationApi.vehicle ? decodeApiToVehicle(reservationApi.vehicle) : null,
        villa: reservationApi.villa ? decodeApiToVilla(reservationApi.villa) : null,
        event: reservationApi.event ? decodeApiToEvent(reservationApi.event) : null,
        seats: reservationApi.seats,
        bottles: reservationApi.bottles,
        creditCard: decodeCreditCard(reservationApi.credit_card),
        documents: reservationApi.documents ? reservationApi.documents.map(decodeDocument) : null,
        phone: reservationApi.phone,
    };
};
