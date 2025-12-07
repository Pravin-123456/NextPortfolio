import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const get = query({
  args: {},
  handler: async (ctx) => {
    const contact = await ctx.db.query("contact").first();
    return contact;
  },
});

export const update = mutation({
  args: {
    id: v.optional(v.id("contact")), // Optional because it might not exist yet
    title: v.string(),
    description: v.string(),
    email: v.string(),
    isActive: v.boolean(),
  },
  handler: async (ctx, args) => {
    const { id, ...rest } = args;
    if (id) {
      await ctx.db.patch(id, rest);
    } else {
      // Check if one exists to avoid duplicates if id wasn't passed but one exists
      const existing = await ctx.db.query("contact").first();
      if (existing) {
        await ctx.db.patch(existing._id, rest);
      } else {
        await ctx.db.insert("contact", rest);
      }
    }
  },
});
