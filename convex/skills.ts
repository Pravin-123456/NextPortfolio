import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Get all skills
export const getSkills = query({
  handler: async (ctx) => {
    return await ctx.db.query("skills").collect();
  },
});

// Add new skill
export const addSkill = mutation({
  args: {
    isActive: v.boolean(),
    name: v.string(),
    icon: v.string(),
    percentage: v.number(),
    position: v.string(),
  },
  handler: async (ctx, args) => {
    const skillId = await ctx.db.insert("skills", {
      isActive: args.isActive,
      name: args.name,
      icon: args.icon,
      percentage: args.percentage,
      position: args.position,
    });
    return skillId;
  },
});

// Update skill
export const updateSkill = mutation({
  args: {
    _id: v.id("skills"),
    isActive: v.boolean(),
    name: v.string(),
    icon: v.string(),
    percentage: v.number(),
    position: v.string(),
  },
  handler: async (ctx, args) => {
    const { _id, ...rest } = args;
    await ctx.db.patch(_id, rest);
  },
});

// Delete skill
export const deleteSkill = mutation({
  args: { _id: v.id("skills") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args._id);
  },
});
