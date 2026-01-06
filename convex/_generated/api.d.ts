/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as about from "../about.js";
import type * as contact from "../contact.js";
import type * as heroText from "../heroText.js";
import type * as messages from "../messages.js";
import type * as projects from "../projects.js";
import type * as proschema from "../proschema.js";
import type * as services from "../services.js";
import type * as skills from "../skills.js";
import type * as socialLinks from "../socialLinks.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  about: typeof about;
  contact: typeof contact;
  heroText: typeof heroText;
  messages: typeof messages;
  projects: typeof projects;
  proschema: typeof proschema;
  services: typeof services;
  skills: typeof skills;
  socialLinks: typeof socialLinks;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
