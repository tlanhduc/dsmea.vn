import fs from 'fs';
import path from 'path';

const contentDirectory = path.join(process.cwd(), 'content');

export interface MarkdownFile {
  slug: string;
  title: string;
  modifiedDate: Date;
}

export interface DocumentLink {
  text: string;
  url: string;
}

export function getAllMarkdownFiles(): MarkdownFile[] {
  try {
    if (!fs.existsSync(contentDirectory)) {
      console.warn(`Content directory does not exist: ${contentDirectory}`);
      return [];
    }

    const files = fs.readdirSync(contentDirectory);
    const markdownFiles = files
      .filter((file) => file.endsWith('.md'))
      .map((file) => {
        try {
          const slug = file.replace(/\.md$/, '');
          const filePath = path.join(contentDirectory, file);
          const stats = fs.statSync(filePath);
          const content = fs.readFileSync(filePath, 'utf8');
          const firstLine = content.split('\n')[0];
          // Loại bỏ tất cả dấu * ở đầu và cuối (có thể có nhiều dấu **)
          let title = firstLine.trim();
          // Loại bỏ tất cả dấu * ở đầu
          title = title.replace(/^\*+/, '');
          // Loại bỏ tất cả dấu * ở cuối
          title = title.replace(/\*+$/, '');
          title = title.trim() || slug;

          return {
            slug,
            title,
            modifiedDate: stats.mtime,
          };
        } catch (error) {
          console.error(`Error reading file ${file}:`, error);
          return null;
        }
      })
      .filter((file): file is MarkdownFile => file !== null);

    return markdownFiles.sort((a, b) => b.modifiedDate.getTime() - a.modifiedDate.getTime());
  } catch (error) {
    console.error('Error reading markdown files:', error);
    return [];
  }
}

export function getMarkdownContent(slug: string): string | null {
  try {
    const filePath = path.join(contentDirectory, `${slug}.md`);

    if (!fs.existsSync(filePath)) {
      console.warn(`Markdown file not found: ${filePath}`);
      return null;
    }

    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    console.error(`Error reading markdown content for slug ${slug}:`, error);
    return null;
  }
}

export function getDocumentLink(content: string): DocumentLink | null {
  try {
    // Tìm pattern: "Link tài liệu:" hoặc "link tài liệu:" theo sau là link markdown [text](url) hoặc URL trực tiếp
    const lines = content.split('\n');
    
    for (const line of lines) {
      const trimmedLine = line.trim();
      // Tìm dòng có chứa "Link tài liệu:" hoặc "link tài liệu:"
      const linkMatch = trimmedLine.match(/[Ll]ink\s+tài\s+liệu:\s*(.+)/i);
      if (linkMatch) {
        const linkPart = linkMatch[1].trim();
        
        // Thử parse markdown link [text](url)
        const markdownLinkMatch = linkPart.match(/\[([^\]]+)\]\(([^)]+)\)/);
        if (markdownLinkMatch) {
          return {
            text: markdownLinkMatch[1],
            url: markdownLinkMatch[2],
          };
        }
        
        // Nếu không phải markdown link, kiểm tra xem có phải URL không
        const urlMatch = linkPart.match(/(https?:\/\/[^\s]+)/);
        if (urlMatch) {
          return {
            text: 'Tại đây',
            url: urlMatch[1],
          };
        }
        
        // Nếu có text "Tại đây" hoặc "Here", tìm URL trong cùng dòng hoặc dòng tiếp theo
        if (linkPart.toLowerCase().includes('tại đây') || linkPart.toLowerCase().includes('here')) {
          // Tìm URL trong dòng hiện tại hoặc dòng tiếp theo
          for (let i = 0; i < Math.min(3, lines.length); i++) {
            const nextLine = lines[lines.indexOf(line) + i]?.trim() || '';
            const urlInLine = nextLine.match(/(https?:\/\/[^\s]+)/);
            if (urlInLine) {
              return {
                text: 'Tại đây',
                url: urlInLine[1],
              };
            }
          }
        }
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error parsing document link:', error);
    return null;
  }
}

export function saveMarkdownContent(slug: string, content: string): boolean {
  try {
    // Đảm bảo thư mục content tồn tại
    if (!fs.existsSync(contentDirectory)) {
      fs.mkdirSync(contentDirectory, { recursive: true });
    }

    const filePath = path.join(contentDirectory, `${slug}.md`);
    fs.writeFileSync(filePath, content, 'utf8');
    
    return true;
  } catch (error) {
    console.error(`Error saving markdown content for slug ${slug}:`, error);
    return false;
  }
}
