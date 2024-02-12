import { EventCategory } from "./EventCategory";

export interface EventCategoryApi {
    id: number,
    attributes: { name: string, description: string | null };
}
export const encodeEventCategoryToApi = (eventCategory: EventCategory): EventCategoryApi => {
    return {
        id: eventCategory.id,
        attributes: { name: eventCategory.name , description:eventCategory.description},
    };
};