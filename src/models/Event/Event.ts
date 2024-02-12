import { EventCategory, decodeApiToEventCategory } from "../EventCategory/EventCategory";
import { Partner, decodePartner } from "../Partner/Partner";
import { PhotoApi } from "./EventApi";
export interface Photo {
    id: number;
    name: string;
    url: string;
}
export interface Event {
    id: number;
    name: string;
    price: number;
    promotingInfo: string;
    namePromoter: string;
    description: string | null;
    totalBottles: number;
    totalSeats: number;
    remainingSeats: number;
    remainingBottles: number;
    startDate: string,
    startTime: string,
    endDate: string,
    endTime: string,
    location: string,
    photos: Photo[] | null;
    partner: Partner | null;
    categoryEvents: EventCategory[];
    active: boolean
}
export const decodeApiToPhoto = (photoApi: PhotoApi): Photo => {
    return {
        id: photoApi.id,
        name: photoApi.attributes.name,
        url: photoApi.attributes.url,
    };
};
export const decodeApiToEvent = (eventApi): Event => {
    return {
        id: eventApi.id,
        name: eventApi.attributes.name,
        price: eventApi.attributes.price,
        promotingInfo: eventApi.attributes.promiting_info,
        namePromoter: eventApi.attributes.name_promoter,
        description: eventApi.attributes.description,
        totalBottles: eventApi.attributes.total_bottles,
        totalSeats: eventApi.attributes.total_seats,
        remainingSeats: eventApi.attributes.remaining_seats,
        remainingBottles: eventApi.attributes.remaining_bottles,
        startDate: eventApi.attributes.start_date,
        startTime: eventApi.attributes.start_time,
        endDate: eventApi.attributes.end_date,
        endTime: eventApi.attributes.end_time,
        location: eventApi.attributes.location,
        photos: eventApi.attributes.photos.data ? eventApi.attributes.photos.data.map(decodeApiToPhoto) : null,
        // partner:null,
       partner: eventApi.attributes.partner.data ? decodePartner(eventApi.attributes.partner.data) : null,
        categoryEvents: eventApi.attributes.category_events.data.map(decodeApiToEventCategory),
        active: eventApi.attributes.active
    };
};



