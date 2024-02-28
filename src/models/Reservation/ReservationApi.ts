import { CustomerApi } from "../Customer/CustomerApi";
import { EventApi } from "../Event/EventApi";
import { VehicleApi } from "../Vehicle/VehicleApi";
import { VillaApi } from "../Villa/VillaApi";
import { Document } from "./Reservation";
export interface CreditCardApi {
    number: string,
    expiry_date: string,
    holder_name: string,
    cvv: number
}
export interface DocumentApi {
    id: number;
    name: string;
    url: string;
}
export const encodeDocument = (document: Document): DocumentApi => {
    return {
        id: document.id,
        name: document.name,
        url: document.url,
    };
};
export interface ReservationApi {
    pickup_date: string | null;
    pickup_time: string | null;
    drop_off_date: string | null;
    drop_off_time: string | null;
    pickup_location: string | null;
    drop_off_location: string | null;
    customer: CustomerApi;
    tax: number | null;
    total_amount: number;
    added_amount: number;
    status: string;
    rejection_reason: string | null;
    vehicle: VehicleApi | null;
    villa: VillaApi | null;
    event: EventApi | null;
    seats: number | null;
    bottles: number | null;
    credit_card: CreditCardApi;
    documents: DocumentApi[] | null;
    phone: string | null;
}
// export const encodeReservationToApi = (reservation: Reservation): ReservationApi => {
//     return {
//         pickup_date: reservation.pickupDate,
//         pickup_time: reservation.pickupTime,
//         drop_off_date: reservation.dropOffDate,
//         drop_off_time: reservation.dropOffTime,
//         pickup_location: reservation.pickupLocation,
//         drop_off_location: reservation.dropOffLocation,
//         customer: encodeCustomer(reservation.customer),
//         tax: reservation.tax,
//         total_amount: reservation.totalAmount,
//         added_amount: reservation.addedAmount,
//         status: reservation.status,
//         rejection_reason: reservation.rejectionReason,
//         vehicle: reservation.vehicle ? encodeVehicleToApi(reservation.vehicle) : null,
//         villa: reservation.villa ? encodeVillaToApi(reservation.villa) : null,
//         event: reservation.event ? encodeEventToApi(reservation.event) : null,
//         seats: reservation.seats,
//         bottles: reservation.bottles,
//         credit_card: encodeCreditCard(reservation.creditCard),
//         documents: reservation.documents ? reservation.documents.map(encodeDocument) : null,
//         phone: reservation.phone,
//     };
// }