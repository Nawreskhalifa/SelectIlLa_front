import { Villa } from "./Villa";

export interface VillaApi {
    id: number,
    name: string,
    city: string,
    rooms: number,
    baths: number,
    view: string,
    sleeps: number,
    pool: string,
    daily: number,
    new_daily: number,
    deposit: number,
    description: string | null,
    minioeuvre_daily: number,
    owner: string,
}
export const encodeVillaToApi = (villa: Villa): VillaApi => {
    return {
        id: villa.id,
        name: villa.name,
        city: villa.city,
        rooms: villa.rooms,
        baths: villa.baths,
        view: villa.view,
        sleeps: villa.sleeps,
        pool: villa.pool,
        daily: villa.daily,
        new_daily: villa.newDaily,
        deposit: villa.deposit,
        description: villa.description,
        minioeuvre_daily: villa.minioeuvreDaily,
        owner: villa.owner,
    };
}