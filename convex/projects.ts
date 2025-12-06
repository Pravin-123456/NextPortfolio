import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// CREATE
export const addProject = mutation({
  args: {
    id: v.string(),
    title: v.string(),
    description: v.string(),
    tech: v.array(v.string()),
    image: v.string(),
    liveUrl: v.string(),
    githubUrl: v.string(),
    isActive: v.boolean(),
  },
  handler: async ({ db }, data) => {
    return await db.insert("projects", data);
  },
});

// LIST
export const getProject = query(async ({ db }) => {
  return db.query("projects").collect();
});

// UPDATE
export const updateProject = mutation({
  args: {
    _id: v.id("projects"), // Convex document ID
    id: v.optional(v.string()),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    tech: v.optional(v.array(v.string())),
    image: v.optional(v.string()),
    liveUrl: v.optional(v.string()),
    githubUrl: v.optional(v.string()),
    isActive: v.optional(v.boolean()),
  },
  handler: async ({ db }, { _id, ...updates }) => {
    await db.patch(_id, updates);
    return { success: true };
  },
});

// DELETE
export const deleteProject = mutation({
  args: { _id: v.id("projects") },
  handler: async ({ db }, { _id }) => {
    await db.delete(_id);
    return { success: true };
  },
});
