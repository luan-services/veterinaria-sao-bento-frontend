import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
        userAgent: '*',
        allow: '/',
        disallow: ['complete-profile', 'forgot-password', 'reset-password', 'check-email', 'email-verified', 
            '/dashboard/', '/login', '/register'], 
        },
        sitemap: 'https://veterinariasaobento.com.br/sitemap.xml', 
    }
}