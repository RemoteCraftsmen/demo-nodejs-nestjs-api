import * as Joi from '@hapi/joi';

export const configValidationSchema = Joi.object({
    NODE_ENV: Joi.string().required(),
    SERVER_PORT: Joi.number().required(),
    APP_SECRET: Joi.string().required(),
    APP_FRONTEND_URL: Joi.string().required(),

    MYSQL_ROOT_PASSWORD: Joi.string().required(),
    MYSQL_DATABASE: Joi.string().required(),
    MYSQL_HOST: Joi.string().required(),
    MYSQL_USER: Joi.string().required(),
    MYSQL_PASSWORD: Joi.string().required(),
    MYSQL_PORT: Joi.number().required(),

    REDIS_HOST: Joi.string().required(),
    REDIS_PASSWORD: Joi.string().required(),
    REDIS_PORT: Joi.number().required(),
    REDIS_CACHE_DB: Joi.number().required(),
    REDIS_TTL: Joi.number().required()
});
