export interface ProfileDescription{
    addressId: string;
    coins: number;
    description: string | null;
    district: string;
    email: string;
    isBlocked: boolean;
    name: string;
    phone: string | null;
    place: string;
    postalCode: number;
    profile: string | null;
    state: string;
    subscriptionStatus: string;
    type: string;
}

export interface ProfileMapImage{
    images: string[] | null;
    latitude: number;
    longitude: number;
}


export interface AddressFormValues {
    place: string;
    district: string;
    state: string;
    postalCode: string;
}


export  interface EditLatLondValues{
    addressId: string;
    currentLat: number;
    currentLng: number;
}


export interface ImageData {
    file: File;
    preview: string;
  }