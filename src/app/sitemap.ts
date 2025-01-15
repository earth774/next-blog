import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/posts';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const links = [
        {
            url: 'https://amiearth.com', // Replace with your homepage
            lastModified: new Date(),
        },
    ]
    const posts = await getAllPosts();
    posts.forEach(post => {
        links.push({
            url: `https://amiearth.com/blog/${post.slug}`,
            lastModified: new Date(post.date)
        });
    })
    return links;
}