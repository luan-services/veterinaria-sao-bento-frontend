import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
        url: 'https://veterinariasaobento.com.br',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1.0,
        },
        {
        url: 'https://seusite.com.br/privacy-policy',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.1,
        },
        {
        url: 'https://seusite.com.br/terms-of-use',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.1,
        },
    ]
}