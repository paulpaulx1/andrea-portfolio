// app/api/revalidate/route.js
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

// The secret token to validate requests
const WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET;

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Check for the secret in the X-Sanity-Webhook-Secret header
    const webhookSecret = request.headers.get('x-sanity-webhook-secret');
    
    if (webhookSecret !== WEBHOOK_SECRET) {
      console.log('Invalid webhook secret');
      return NextResponse.json({ success: false, message: 'Invalid webhook secret' }, { status: 401 });
    }
    
    // Continue with revalidation logic...
    console.log('Revalidating paths for:', body._type, body._id);
    
    // Revalidate all needed paths
    revalidatePath('/');
    
    if (body._type === 'film') {
      revalidatePath('/films');
      
      // If the document has a slug field, use that, otherwise fall back to title
      const slugField = body.slug?.current || body.title;
      if (slugField) {
        revalidatePath(`/films/${slugField}`);
      }
    }
    
    return NextResponse.json({ 
      success: true, 
      revalidated: true,
      message: `Revalidation complete for ${body._type}` 
    });
    
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}