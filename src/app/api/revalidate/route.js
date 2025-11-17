// app/api/revalidate/route.js
import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

// The secret token to validate requests
const WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET;

export async function POST(request) {
  try {
    const body = await request.json();

    // Check for the secret in the X-Sanity-Webhook-Secret header
    const webhookSecret = request.headers.get("x-sanity-webhook-secret");

    if (webhookSecret !== WEBHOOK_SECRET) {
      console.log("Invalid webhook secret");
      return NextResponse.json(
        { success: false, message: "Invalid webhook secret" },
        { status: 401 }
      );
    }

    console.log("Revalidating paths for:", body._type, body._id);

    // Always revalidate homepage
    revalidatePath("/");

    // Handle Film documents
    if (body._type === "film") {
      revalidatePath("/films");

      const slugField = body.slug?.current || body.title;
      if (slugField) {
        revalidatePath(`/films/${slugField}`);
      }
    }

    // Handle Works on Paper Group documents
    if (body._type === "worksOnPaperGroup") {
      // Revalidate the groups API
      revalidatePath("/api/works-on-paper/groups");

      // Revalidate the specific year/location page
      if (body.year && body.location) {
        revalidatePath(`/works-on-paper/${body.year}/${body.location}`);
      }
    }

    // Handle individual Work on Paper documents
    if (body._type === "workOnPaper") {
      // Need to get the group reference to know year/location
      // For now, revalidate the groups API (which will refresh counts)
      revalidatePath("/api/works-on-paper/groups");

      // If we have the group info in the webhook payload
      if (body.group) {
        // Revalidate the portfolio page
        revalidatePath(
          `/works-on-paper/${body.group.year}/${body.group.location}`
        );

        // Revalidate the specific work page
        if (body.slug?.current) {
          revalidatePath(
            `/works-on-paper/${body.group.year}/${body.group.location}/${body.slug.current}`
          );
        }
      }
    }

    return NextResponse.json({
      success: true,
      revalidated: true,
      message: `Revalidation complete for ${body._type}`,
    });
  } catch (error) {
    console.error("Revalidation error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
