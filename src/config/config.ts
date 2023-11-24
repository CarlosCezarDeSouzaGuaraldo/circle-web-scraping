import dotenv from 'dotenv';

dotenv.config();

interface AppConfig {
    HOST: string;
    PORT: number;
    SITE_URL: string;
    SITE_EMAIL: string;
    SITE_PASSWORD: string;
}

const config: AppConfig = {
    HOST: process.env.HOST || 'localhost',
    PORT: parseInt(process.env.PORT || '3000', 10),
    SITE_URL: `${process.env.SITE_URL}`,
    SITE_EMAIL: `${process.env.SITE_EMAIL}`,
    SITE_PASSWORD: `${process.env.SITE_PASSWORD}`
};

export default config;
