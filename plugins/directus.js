import { createDirectus, rest, readItem, readItems, readCollection, createItem } from '@directus/sdk';

export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig();
    const apiURL = config.public.apiURL;
    const directus = createDirectus(apiURL).with(rest())

    return {
        provide: { directus, readItem, readItems, readCollection, createItem },
    };
});


