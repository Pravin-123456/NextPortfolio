import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Get all services
export const getServices = query({
  handler: async (ctx) => {
    return await ctx.db.query("services").collect();
  },
});

// Add new service
export const addService = mutation({
  args: {
    isActive: v.boolean(),
    name: v.string(),
    description: v.string(),
    position: v.string(),
  },
  handler: async (ctx, args) => {
    const serviceId = await ctx.db.insert("services", {
      isActive: args.isActive,
      name: args.name,
      description: args.description,
      position: args.position,
    });
    return serviceId;
  },
});

// Update service
export const updateService = mutation({
  args: {
    _id: v.id("services"),
    isActive: v.boolean(),
    name: v.string(),
    description: v.string(),
    position: v.string(),
  },
  handler: async (ctx, args) => {
    const { _id, ...rest } = args;
    await ctx.db.patch(_id, rest);
  },
});

// Delete service
export const deleteService = mutation({
  args: { _id: v.id("services") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args._id);
  },
});
