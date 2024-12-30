import Header from '@/app/components/Header'
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