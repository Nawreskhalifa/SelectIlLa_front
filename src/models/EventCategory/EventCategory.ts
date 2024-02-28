import { EventCategoryApi } from "./EventCategoryApi";

export interface EventCategory {
    id: number;
    name: string;
    description: string | null
}
export const decodeApiToEventCategory = (eventCategoryApi: EventCategoryApi): EventCategory => {
    return {
        id: eventCategoryApi.id,
        name: eventCategoryApi.attributes.name,
        description: eventCategoryApi.attributes.description
    };
};