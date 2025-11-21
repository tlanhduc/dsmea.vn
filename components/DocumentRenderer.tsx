'use client';

interface DocumentRendererProps {
  content: string;
  type: 'html';
}


export default function DocumentRenderer({ content, type }: DocumentRendererProps) {
  // Xử lý HTML: thêm target="_blank" cho tất cả link
  const processedContent = content.replace(
    /<a\s+([^>]*href=["'][^"']*["'][^>]*)>/gi,
    (match, attrs) => {
      // Kiểm tra xem đã có target chưa
      if (!/target=/i.test(attrs)) {
        return `<a ${attrs} target="_blank" rel="noopener noreferrer">`;
      }
      return match;
    }
  );

  return (
    <div 
      className="markdown-content word-document"
      style={{ 
        fontFamily: 'Times New Roman, serif',
        fontSize: '12pt',
        lineHeight: '1.5',
      }}
      dangerouslySetInnerHTML={{ __html: processedContent }}
    />
  );
}
