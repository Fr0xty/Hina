declare module 'hina-general-types' {
    export interface WaifuImImageObject {
        signature: string;
        extension: string;
        image_id: number;
        favourites: number;
        dominant_color: string;
        source: string;
        uploaded_at: string;
        liked_at: null | any;
        is_nsfw: boolean;
        width: number;
        height: number;
        url: string;
        preview_url: string;
        tags: {
            tag_id: number;
            name: string;
            description: string;
            is_nsfw: boolean;
        }[];
    }
}
