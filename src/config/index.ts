require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

const env = (key, defaultValue = null) => process.env[key] || defaultValue;
const isEnabled = key => env(key) && env(key) === 'true';

if (!['production', 'development', 'test'].includes(env('NODE_ENV'))) {
    console.error('NODE_ENV has wrong option');
    process.exit();
}

export default () => ({
    app: {
        env: env('NODE_ENV'),
        serverPort: parseInt(env('PORT', 3001)),
        secret: env('APP_SECRET'),
        frontendUrl: env('APP_FRONTEND_URL')
    },
    db: {
        url:
            env('DATABASE_DIALECT', 'mysql') +
            '://' +
            env('DATABASE_USERNAME', 'guest') +
            ':' +
            env('DATABASE_PASSWORD', 'guest') +
            '@' +
            env('DATABASE_HOST', 'localhost') +
            ':' +
            env('DATABASE_PORT', 3306) +
            '/' +
            env('DATABASE_NAME', 'db'),
        host: env('DATABASE_HOST', 'localhost'),
        name: env('DATABASE_NAME'),
        username: env('DATABASE_USERNAME'),
        password: env('DATABASE_PASSWORD'),
        dialect: env('DATABASE_DIALECT', 'mysql'),
        port: parseInt(env('DATABASE_PORT', 3306)),
        define: {
            charset: 'utf8mb4',
            collate: 'utf8mb4_unicode_ci',
            timestamps: true
        }
    },
    redis: {
        host: env('REDIS_HOST'),
        password: env('REDIS_PASSWORD'),
        port: env('REDIS_PORT'),
        cacheDb: env('REDIS_CACHE_DB'),
        ttl: env('REDIS_TTL')
    }
});
