import { defineConfig } from "@solidjs/start/config";

import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
    server: {
        preset: "vercel"
    }
})
