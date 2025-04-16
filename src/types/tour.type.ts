import { TourMeta } from "./tour-meta.type";

export type TourForm = {
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