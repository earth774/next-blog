import { getPostBySlug, getAllPosts } from '@/lib/posts'
import Markdown from 'markdown-to-jsx'
import NavMenu from '@/app/components/NavMenu'
import styles from './page.module.css'
import Footer from '@/app/components/Footer'
// Add metadata for each blog post
export async function generateMetadata({ params }: { params: { slug: string } }) {
    const { slug } = await params;
    const post: any = await getPostBySlug(slug)
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

const BlogPage = async ({ params }: { params: { slug: string } }) => {
    const { slug } = await params;
    const post: any = await getPostBySlug(slug)

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