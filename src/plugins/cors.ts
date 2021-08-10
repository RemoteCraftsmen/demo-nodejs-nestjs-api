import { ConfigService } from '@nestjs/config';
import * as cors from 'cors';

export const useCors = app => {
    const configService = app.get(ConfigService);

    const { frontendUrl, adminUrl } = configService.get('app');
    const originsWhitelist = [frontendUrl, adminUrl];

    const corsOptions = {
        origin(origin, callback) {
            if (originsWhitelist.includes(origin) || !origin) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS xxxx'));
            }
        },
        credentials: true
    };

    app.use(cors(corsOptions));
};
