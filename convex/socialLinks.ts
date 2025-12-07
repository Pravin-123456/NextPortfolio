import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("socialLinks").collect();
  },
});

export const create = mutation({
  args: {
    platform: v.string(),
    url: v.string(),
    icon: v.string(),
    isActive: v.boolean(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("socialLinks", args);
  },
});

export const update = mutation({
  args: {
    id: v.id("socialLinks"),
    platform: v.string(),
    url: v.string(),
    icon: v.string(),
    isActive: v.boolean(),
  },
  handler: async (ctx, args) => {
    const { id, ...rest } = args;
    await ctx.db.patch(id, rest);
  },
});

export const remove = mutation({
  args: { id: v.id("socialLinks") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
