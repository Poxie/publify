declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NEXT_PUBLIC_API_ENDPOINT: string;
            NEXT_PUBLIC_WEBSITE_NAME: string;
            NEXT_PUBLIC_IMAGE_ENDPOINT: string;
            NEXT_PUBLIC_IMAGE_HOST: string;
            NEXT_PUBLIC_WEBSITE_ORIGIN: string;
            NEXT_PUBLIC_WEBSITE_NAME: string;
        }
    }
}

export {};