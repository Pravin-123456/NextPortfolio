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
  })
    .index("by_id", ["id"]),
});
