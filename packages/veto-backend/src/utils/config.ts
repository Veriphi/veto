enum ENV {
    dev = 'dev',
    prod = 'prod',
    qa = 'qa',
}

export type Config = {
    port: number,
    environment: ENV,
}

export default {
    port: process.env.PORT ?? 8080,
    environment: process.env.NODE_ENV ?? 'dev',
} as Config;
