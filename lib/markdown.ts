import fs from 'fs';
import path from 'path';

const contentDirectory = path.join(process.cwd(), 'content');

export interface MarkdownFile {
  slug: string;
  title: string;
  modifiedDate: Date;
}

export function getAllMarkdownFiles(): MarkdownFile[] {
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }

  const files = fs.readdirSync(contentDirectory);
  const markdownFiles = files
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const slug = file.replace(/\.md$/, '');
      const filePath = path.join(contentDirectory, file);
      const stats = fs.statSync(filePath);
      const content = fs.readFileSync(filePath, 'utf8');
      const firstLine = content.split('\n')[0];
      const title = firstLine.replace(/^\*\*|\*\*$/g, '').trim();

      return {
        slug,
        title,
        modifiedDate: stats.mtime,
      };
    });

  return markdownFiles.sort((a, b) => b.modifiedDate.getTime() - a.modifiedDate.getTime());
}

export function getMarkdownContent(slug: string): string | null {
  const filePath = path.join(contentDirectory, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  return fs.readFileSync(filePath, 'utf8');
}
