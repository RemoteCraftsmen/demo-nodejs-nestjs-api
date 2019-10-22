require('dotenv').config();

const env = (key, defaultValue = null) => process.env[key] || defaultValue;
const isEnabled = key => env(key) && env(key) === 'true';

const config = {
    app: {
        env: env('NODE_ENV'),
        port: parseInt(env('PORT', 3000)),
        host: env('APP_HOST', '127.0.0.1'),
        secret: env('APP_SECRET'),
        frontendUrl: env('APP_FRONTEND_URL')
    },
    redis: {
        host: env('REDIS_HOST'),
        port: env('REDIS_PORT'),
        pass: env('REDIS_PASS') ? env('REDIS_PASS') : undefined,
        password: env('REDIS_PASS') ? env('REDIS_PASS') : undefined,
        ttl: env('REDIS_TTL')
    }
};

module.exports = config;
