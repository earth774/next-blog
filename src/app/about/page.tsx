import { getAboutBySlug } from '@/lib/about';
import Markdown from 'markdown-to-jsx';
import styles from './page.module.css'
import dynamic from 'next/dynamic';

const MainLayout = dynamic(() => import('@/app/components/MainLayout'));
const Header = dynamic(() => import('@/app/components/Header'));
const Footer = dynamic(() => import('@/app/components/Footer'));
// Add metadata for each blog post
export async function generateMetadata() {
    const about = await getAboutBySlug('about')
    return {
        title: `About | Amiearth`,
        description: about.content.substring(0, 160),
        alternates: {
            types: {
                "application/rss+xml": "https://amiearth.com/feed.xml",
            },
        },
    }
}

export default async function About() {
    const about = await getAboutBySlug('about')
    return (
        <div>
            <Header />
            <MainLayout>
                <div className={styles.content}>
                    <Markdown>{about.content}</Markdown>
                </div>
            </MainLayout>
            <Footer />
        </div>
    )
}