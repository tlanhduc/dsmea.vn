import fs from 'fs';
import path from 'path';

const contentDirectory = path.join(process.cwd(), 'content');

export interface DocumentFile {
  slug: string;
  title: string;
  modifiedDate: Date;
  type: 'html';
}

export interface DocumentLink {
  text: string;
  url: string;
}

export function getAllDocuments(): DocumentFile[] {
  try {
    if (!fs.existsSync(contentDirectory)) {
      console.warn(`Content directory does not exist: ${contentDirectory}`);
      return [];
    }

    const files = fs.readdirSync(contentDirectory);
    const documentFiles = files
      .filter((file) => file.endsWith('.html'))
      .map((file) => {
        try {
          const slug = file.replace(/\.html$/, '');
          const filePath = path.join(contentDirectory, file);
          const stats = fs.statSync(filePath);
          const content = fs.readFileSync(filePath, 'utf8');
          
          // Lấy title từ HTML: tìm text "THÔNG TIN, DỮ LIỆU VỀ BẤT ĐỘNG SẢN..."
          let title = '';
          
          // Tìm trong các thẻ heading hoặc text trong body
          const titlePattern = /THÔNG TIN,?\s*DỮ LIỆU VỀ BẤT ĐỘNG SẢN[^<]*/i;
          const bodyContent = extractBodyContent(content);
          
          // Tìm trong các thẻ h1, h2, h3, p, div, span
          const headingMatch = bodyContent.match(/<(h[1-6]|p|div|span)[^>]*>([^<]*THÔNG TIN,?\s*DỮ LIỆU VỀ BẤT ĐỘNG SẢN[^<]*)<\/\1>/i);
          if (headingMatch && headingMatch[2]) {
            title = headingMatch[2].trim();
          } else {
            // Tìm trực tiếp trong text
            const textMatch = bodyContent.match(titlePattern);
            if (textMatch) {
              title = textMatch[0].trim();
            }
          }
          
          // Nếu không tìm thấy, để trống (không dùng slug)
          if (!title) {
            title = '';
          }

          return {
            slug,
            title,
            modifiedDate: stats.mtime,
            type: 'html' as const,
          };
        } catch (error) {
          console.error(`Error reading file ${file}:`, error);
          return null;
        }
      })
      .filter((file): file is DocumentFile => file !== null);

    return documentFiles.sort((a, b) => b.modifiedDate.getTime() - a.modifiedDate.getTime());
  } catch (error) {
    console.error('Error reading document files:', error);
    return [];
  }
}

function extractBodyContent(html: string): string {
  // Loại bỏ các thẻ <style> và CSS
  let content = html.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
  
  // Loại bỏ các thẻ <script>
  content = content.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
  
  // Tìm nội dung trong <body> tag
  const bodyMatch = content.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  if (bodyMatch) {
    return bodyMatch[1].trim();
  }
  
  // Nếu không có <body>, loại bỏ các thẻ wrapper
  // Loại bỏ <html> và </html>
  content = content.replace(/<html[^>]*>/gi, '').replace(/<\/html>/gi, '');
  
  // Loại bỏ <head>...</head>
  content = content.replace(/<head[^>]*>[\s\S]*?<\/head>/gi, '');
  
  // Loại bỏ <body> và </body> nếu còn sót
  content = content.replace(/<body[^>]*>/gi, '').replace(/<\/body>/gi, '');
  
  return content.trim();
}

export async function getDocumentContent(slug: string): Promise<{ content: string; type: 'html' } | null> {
  try {
    // Đọc file HTML
    const htmlPath = path.join(contentDirectory, `${slug}.html`);
    if (fs.existsSync(htmlPath)) {
      const fullContent = fs.readFileSync(htmlPath, 'utf8');
      // Chỉ lấy nội dung bên trong, loại bỏ các thẻ wrapper và CSS
      const content = extractBodyContent(fullContent);
      return { content, type: 'html' };
    }

    console.warn(`HTML file not found: ${slug}`);
    return null;
  } catch (error) {
    console.error(`Error reading HTML content for slug ${slug}:`, error);
    return null;
  }
}

export function saveDocumentContent(slug: string, content: string, type: 'html' = 'html'): boolean {
  try {
    // Đảm bảo thư mục content tồn tại
    if (!fs.existsSync(contentDirectory)) {
      fs.mkdirSync(contentDirectory, { recursive: true });
    }

    const filePath = path.join(contentDirectory, `${slug}.html`);
    fs.writeFileSync(filePath, content, 'utf8');
    
    return true;
  } catch (error) {
    console.error(`Error saving HTML content for slug ${slug}:`, error);
    return false;
  }
}

// Các hàm cũ đã không còn sử dụng vì chỉ hỗ trợ HTML

