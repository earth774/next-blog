import Image from 'next/image'
import Header from '@/app/components/Header'
import NavBlog from '@/app/components/NavMenu'
import Footer from '@/app/components/Footer'
// Add metadata for each blog post
export async function generateMetadata() {
  return {
    title: `Home | Amiearth`,
    description: `Home page of amiearth`,
  }
}

export default function Home() {
  return (
    <>
      <Header className="min-h-screen justify-center" />
    </>
  )
}