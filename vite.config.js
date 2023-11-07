import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import reactRefresh from '@vitejs/plugin-react-refresh'

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/app.scss',
                'resources/js/app.js',
                'resources/js/people_of_interest.jsx'
            ],
            refresh: true,
        }),
        reactRefresh()
    ],
});
