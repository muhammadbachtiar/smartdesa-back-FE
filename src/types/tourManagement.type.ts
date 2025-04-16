import { TourMeta } from "./tour-meta.type";

export type TourData = {
    id: number;
    user_id: number,    
    title: string,
    description: string,
    link: {
        sosmed: {
            key: string,
            value: string,
        }[],
        email: string,
        website: string,
        gmap: string,
    },
    address: string,
    thumbnail: string | undefined,
    latitude: string,
    longitude: string,
    published_at: string | null,
    meta: TourMeta[];
}

// export type TourData =  {
//     id: number,
//     title: string,
//     slug: string,
//     description: string,
//     latitude: string,
//     thumbnail: string,
//     longitude: string,
//     address: string,
//     published_at: string,
//     views: number,
//     created_at: string,
//     updated_at: string
// }
