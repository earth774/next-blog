import Footer from '@/app/components/Footer'
import Header from '@/app/components/Header'
import Link from 'next/link'
import MainLayout from '../components/MainLayout'
import { getAllProjects } from '@/lib/projects'
// Add metadata for each blog post
export async function generateMetadata() {
  return {
    title: `Projects | Amiearth`,
    description: `Projects page of amiearth`,
  }
}


export default function Blog() {
  const projects = getAllProjects()
  return (
    <div>
      <Header />
      <MainLayout>
        <ul >
          {projects.map((project: any) => (
            <li key={project.slug} className='my-4'>
              <Link
                target='_blank'
                href={`${project.link}`}
                className="block my-2 rounded-lg leading-8"
              >
                <em className='underline decoration-wavy decoration-[#51a800] decoration-[10%] underline-offset-[25%] hover:bg-[#FFD700]'>{project.link}</em>
              </Link>
              <p className='text-gray-500'>{project.description}</p>
            </li>
          ))}
        </ul>
      </MainLayout>
      <Footer />
    </div>
  )
}