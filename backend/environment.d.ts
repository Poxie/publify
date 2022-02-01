declare global {
    namespace NodeJS {
        interface ProcessEnv {
            MYSQL_HOST: string;
            MYSQL_USER: string;
            MYSQL_PASSWORD: string;
            MYSQL_DATABASE: string;
            JSON_WEB_TOKEN_SECRET_KEY: string;
            FRONTEND_ORIGIN: string;
            IMAGE_ENDPOINT: string;
            EMAILER_HOST: string;
            EMAILER_PORT: number;
            EMAILER_SERVICE: 'gmail' | 'hotmail';
            EMAILER_EMAIL: string;
            EMAILER_PASSWORD: string;
        }
    }
}

export {};