import Footer from '@/app/components/Footer'
import Header from '@/app/components/Header'
import { getAboutBySlug } from '@/lib/about';
import Markdown from 'markdown-to-jsx';
import styles from './page.module.css'
import MainLayout from '@/app/components/MainLayout';

// Add metadata for each blog post
export async function generateMetadata() {
    const about = await getAboutBySlug('about')
    return {
        title: `About | Amiearth`,
        description: about.content.substring(0, 160),
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