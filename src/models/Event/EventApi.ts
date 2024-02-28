import { EventCategoryApi } from "../EventCategory/EventCategoryApi";
import { PartnerApi } from "../Partner/PartnerApi";
export interface PhotoApi {

    id: number;
    attributes: {
        name: string;
        url: string
    };

}
export interface EventApi {
    id: number,
    attributes: {
        name: string,
        price: number,
        promiting_info: string,
        name_promoter: string,
        description: string | null,
        total_bottles: number,
        total_seats: number,
        remaining_seats: number,
        remaining_bottles: number,
        start_date: string,
        start_time: string,
        end_date: string,
        end_time: string,
        location: string,
        photos: PhotoApi[] | null,
        partner: PartnerApi | null,
        category_events: EventCategoryApi[],
        active:boolean,
        cover_image_index:number
    }
}