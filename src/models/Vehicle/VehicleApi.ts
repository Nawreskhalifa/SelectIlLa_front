import { Vehicle } from "./Vehicle";

export interface VehicleApi {
    id: number,
    make: string,
    brand: string,
    style: string,
    seats: number,
    msrp: string,
    daily: number,
    mice: number,
    new_daily: number,
    deposit: number,
    description: string | null,
    available: boolean,
    owner: string,
}
export const encodeVehicleToApi = (vehicle: Vehicle): VehicleApi => {
    return {
        id: vehicle.id,
        make: vehicle.make,
        brand: vehicle.brand,
        style: vehicle.style,
        seats: vehicle.seats,
        msrp: vehicle.msrp,
        daily: vehicle.daily,
        mice: vehicle.mice,
        new_daily: vehicle.newDaily,
        deposit: vehicle.deposit,
        description: vehicle.description,
        available: vehicle.available,
        owner: vehicle.owner,
    };
}