import { getAllPosts, getPostBySlug } from '@/lib/posts'
import Markdown from 'markdown-to-jsx'
import styles from './page.module.css'
import dynamic from 'next/dynamic';

const NavMenu = dynamic(() => import('@/app/components/NavMenu'));
const Footer = dynamic(() => import('@/app/components/Footer'));

interface Post {
    title: string;
    content: string;
    date: string;
}

// Add metadata for each blog post
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post: Post | null = await getPostBySlug(slug)
    if (!post) {
        return {
            title: 'Post not found',
            description: 'The requested post was not found.',
            alternates: {
                types: {
                    "application/rss+xml": "https://amiearth.com/feed.xml",
                },
            },
        }
    }
    return {
        title: `${post.title} | My Blog`,
        description: post.content.substring(0, 160),
    }
}
// Generate static params for all posts
export async function generateStaticParams() {
    const posts = getAllPosts()
    return posts.map((post) => ({
        slug: post.slug,
    }))
}

const BlogPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    const post: Post | null = await getPostBySlug(slug)
    if (!post) {
        return {
            title: 'Post not found',
            description: 'The requested post was not found.',
        }
    }

    return (
        <>
            <NavMenu />
            <article className={styles.blogPost}>
                <h1 className={styles.title}>{post.title}</h1>
                <time className={styles.date}><em>{post.date}</em></time>
                <div className={styles.content}>
                    <Markdown>{post.content}</Markdown>
                </div>
            </article>
            <Footer />
        </>
    )
}

export default BlogPage