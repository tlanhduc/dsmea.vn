import { NextRequest, NextResponse } from 'next/server';
import { getDocumentContent, saveDocumentContent } from '@/lib/document';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const documentData = await getDocumentContent(slug);

    if (documentData === null) {
      return NextResponse.json(
        { error: 'File not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      content: documentData.content,
      type: documentData.type 
    });
  } catch (error) {
    console.error('Error reading document:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await request.json();
    const { content, type = 'html' } = body;

    if (!content || typeof content !== 'string') {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      );
    }

    // Lưu dưới dạng HTML
    const success = saveDocumentContent(slug, content, 'html');

    if (!success) {
      return NextResponse.json(
        { error: 'Failed to save file' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: 'File saved successfully' });
  } catch (error) {
    console.error('Error saving document:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

