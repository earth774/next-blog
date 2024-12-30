import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import Header from '@/app/components/Header'
import MainLayout from '@/app/components/MainLayout'
import Footer from '@/app/components/Footer'
// Add metadata for each blog post
export async function generateMetadata() {
    return {
        title: `Blog | Amiearth`,
        description: `Blog page of amiearth`,
    }
}


export default function BlogIndex() {
    const posts = getAllPosts()

    return (
        <>
            <Header />
            <MainLayout>
                <ul >
                    {posts.map((post: any) => (
                        <li key={post.slug}>
                            <Link
                                href={`/blog/${post.slug}`}
                                className="block my-4 rounded-lg leading-8"
                            >
                                <em className=' underline decoration-wavy decoration-[#51a800] decoration-[10%] underline-offset-[25%] hover:bg-[#FFD700]'>{post.date} - {post.title}</em>

                            </Link>
                        </li>
                    ))}
                </ul>
            </MainLayout>
            <Footer />
        </>

    )
}