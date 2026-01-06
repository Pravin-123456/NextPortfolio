import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const send = mutation({
  args: {
    email: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    const { email, message } = args;

    // Basic validation
    if (!email || !message) {
      throw new Error("Email and message are required.");
    }

    await ctx.db.insert("messages", {
      email,
      message,
      status: "new",
      createdAt: Date.now(),
    });

    return { success: true };
  },
});
