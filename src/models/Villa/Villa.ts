import { VillaApi } from "./VillaApi";

export interface Villa {
    id: number;
    name: string;
    city: string;
    rooms: number;
    baths: number;
    view: string;
    sleeps: number;
    pool: string;
    daily: number;
    newDaily: number;
    deposit: number;
    description: string | null;
    minioeuvreDaily: number;
    owner: string;
}
export const decodeApiToVilla = (villaApi: VillaApi): Villa => {
    return {
        id: villaApi.id,
        name: villaApi.name,
        city: villaApi.city,
        rooms: villaApi.rooms,
        baths: villaApi.baths,
        view: villaApi.view,
        sleeps: villaApi.sleeps,
        pool: villaApi.pool,
        daily: villaApi.daily,
        newDaily: villaApi.new_daily,
        deposit: villaApi.deposit,
        description: villaApi.description,
        minioeuvreDaily: villaApi.minioeuvre_daily,
        owner: villaApi.owner,
    };
}