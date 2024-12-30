import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), '/src/content/projects')

export interface Project {
    slug: string
    link: string
    description: string
    date: string
}

export function getAllProjects(): Project[] {
    const fileNames = fs.readdirSync(postsDirectory)

    const posts = fileNames.map((fileName) => {
        const slug = fileName.replace(/\.md$/, '')
        return getProjectBySlug(slug)
    })

    // Sort posts by date
    return posts.sort((a, b) => (a.date > b.date ? -1 : 1))
}

export function getProjectBySlug(slug: string): Project {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const { data } = matter(fileContents)

    return {
        slug,
        date: data.date,
        link: data.link,
        description: data.description
    }
} 