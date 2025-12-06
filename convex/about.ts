import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Get all about entries
export const getAbout = query({
  handler: async (ctx) => {
    return await ctx.db.query("about").collect();
  },
});

// Add new about entry
export const addAbout = mutation({
  args: {
    isActive: v.boolean(),
    title: v.string(),
    description: v.string(),
    resume: v.string(),
  },
  handler: async (ctx, args) => {
    const aboutId = await ctx.db.insert("about", {
      isActive: args.isActive,
      title: args.title,
      description: args.description,
      resume: args.resume,
    });
    return aboutId;
  },
});

// Update about entry
export const updateAbout = mutation({
  args: {
    _id: v.id("about"),
    isActive: v.boolean(),
    title: v.string(),
    description: v.string(),
    resume: v.string(),
  },
  handler: async (ctx, args) => {
    const { _id, ...rest } = args;
    await ctx.db.patch(_id, rest);
  },
});

// Delete about entry
export const deleteAbout = mutation({
  args: { _id: v.id("about") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args._id);
  },
});
