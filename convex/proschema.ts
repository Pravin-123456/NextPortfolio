import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  projects: defineTable({
    id: v.string(),
    title: v.string(),
    description: v.string(),
    tech: v.array(v.string()),
    image: v.string(),
    liveUrl: v.string(),
    githubUrl: v.string(),
    isActive: v.boolean(),
  })
    .index("by_id", ["id"]),
  
  heroText: defineTable({
    isActive: v.boolean(),
    title: v.string(),
    subtitle: v.string(),
    description: v.string(),
  }),

  about: defineTable({
    isActive: v.boolean(),
    title: v.string(),
    description: v.string(),
    resume: v.string(),
  }),

  skills: defineTable({
    isActive: v.boolean(),
    name: v.string(),
    icon: v.string(),
    percentage: v.number(),
    position: v.string(), // "left", "center", or "right"
  }),
});
