import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');

export interface ProjectMetadata {
  title: string;
  slug: string;
}

export interface ProjectData extends ProjectMetadata {
  content: string;
}

export function getAllProjects(): ProjectData[] {
  const fileNames = fs.readdirSync(contentDirectory);
  const projects = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(contentDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || slug,
        content,
      };
    });

  return projects;
}

export function getProjectBySlug(slug: string): ProjectData | null {
  try {
    const fullPath = path.join(contentDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || slug,
      content,
    };
  } catch (error) {
    return null;
  }
}
