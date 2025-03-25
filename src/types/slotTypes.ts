export interface Slot{
    id: string;
    name: string;
    status: string;
    type: string;
    userId: string | null;
    vehicleNumber: string | null;
}


export interface AddSlotCredentials{
    name: string;
    type: string
}