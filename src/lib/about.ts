import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const aboutDirectory = path.join(process.cwd(), '/src/content/about')

export interface About {
    slug: string
    title: string
    date: string
    content: string
}


export function getAboutBySlug(slug: string): About {
    const fullPath = path.join(aboutDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const { data, content } = matter(fileContents)

    return {
        slug,
        title: data.title,
        date: data.date,
        content
    }
} 