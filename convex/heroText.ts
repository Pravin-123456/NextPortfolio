import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Get all hero texts
export const getHeroText = query({
  handler: async (ctx) => {
    return await ctx.db.query("heroText").collect();
  },
});

// Add new hero text
export const addHeroText = mutation({
  args: {
    isActive: v.boolean(),
    title: v.string(),
    subtitle: v.string(),
    description: v.string(),
  },
  handler: async (ctx, args) => {
    const heroTextId = await ctx.db.insert("heroText", {
      isActive: args.isActive,
      title: args.title,
      subtitle: args.subtitle,
      description: args.description,
    });
    return heroTextId;
  },
});

// Update hero text
export const updateHeroText = mutation({
  args: {
    _id: v.id("heroText"),
    isActive: v.boolean(),
    title: v.string(),
    subtitle: v.string(),
    description: v.string(),
  },
  handler: async (ctx, args) => {
    const { _id, ...rest } = args;
    await ctx.db.patch(_id, rest);
  },
});

// Delete hero text
export const deleteHeroText = mutation({
  args: { _id: v.id("heroText") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args._id);
  },
});
