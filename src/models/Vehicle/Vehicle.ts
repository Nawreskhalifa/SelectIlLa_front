import { VehicleApi } from "./VehicleApi";

export interface Vehicle {
    id: number,
    make: string,
    brand: string,
    style: string,
    seats: number,
    msrp: string,
    daily: number,
    mice: number,
    newDaily: number,
    deposit: number,
    description: string | null,
    available: boolean,
    owner: string,
}
export const decodeApiToVehicle = (vehicleApi: VehicleApi): Vehicle => {
    return {
        id: vehicleApi.id,
        make: vehicleApi.make,
        brand: vehicleApi.brand,
        style: vehicleApi.style,
        seats: vehicleApi.seats,
        msrp: vehicleApi.msrp,
        daily: vehicleApi.daily,
        mice: vehicleApi.mice,
        newDaily: vehicleApi.new_daily,
        deposit: vehicleApi.deposit,
        description: vehicleApi.description,
        available: vehicleApi.available,
        owner: vehicleApi.owner,
    };
}