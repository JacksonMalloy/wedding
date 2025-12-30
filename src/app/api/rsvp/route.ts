import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { rsvpSchema } from "@/lib/validations/rsvp";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate the request body
    const validationResult = rsvpSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.issues[0].message },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Create Supabase client
    const supabase = await createClient();

    // Check if email already exists (to prevent duplicate RSVPs)
    const { data: existingRsvp } = await supabase
      .from("rsvps")
      .select("id")
      .eq("email", data.email)
      .single();

    if (existingRsvp) {
      // Update existing RSVP
      const { error: updateError } = await supabase
        .from("rsvps")
        .update({
          name: data.name,
          attending: data.attending,
          guest_count: data.attending ? data.guest_count : 0,
          meal_preference: data.attending ? data.meal_preference : null,
          dietary_restrictions: data.attending ? data.dietary_restrictions : null,
          special_requests: data.special_requests,
        })
        .eq("id", existingRsvp.id);

      if (updateError) {
        console.error("Error updating RSVP:", updateError);
        return NextResponse.json(
          { error: "Failed to update RSVP" },
          { status: 500 }
        );
      }

      return NextResponse.json({
        message: "RSVP updated successfully",
        updated: true,
      });
    }

    // Insert new RSVP
    const { error: insertError } = await supabase.from("rsvps").insert({
      name: data.name,
      email: data.email,
      attending: data.attending,
      guest_count: data.attending ? data.guest_count : 0,
      meal_preference: data.attending ? data.meal_preference : null,
      dietary_restrictions: data.attending ? data.dietary_restrictions : null,
      special_requests: data.special_requests,
    });

    if (insertError) {
      console.error("Error inserting RSVP:", insertError);
      return NextResponse.json(
        { error: "Failed to submit RSVP" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "RSVP submitted successfully",
      updated: false,
    });
  } catch (error) {
    console.error("RSVP submission error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
