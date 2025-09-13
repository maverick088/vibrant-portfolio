import { sql } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Portfolio data schemas for API responses
export const experienceSchema = z.object({
  id: z.number(),
  company: z.string(),
  role: z.string(), 
  period: z.string(),
  rating: z.number().min(0).max(100),
  highlights: z.array(z.string()),
  imageUrl: z.string().optional(),
  index: z.number(),
});

export type Experience = z.infer<typeof experienceSchema>;

export const skillSchema = z.object({
  id: z.number(),
  name: z.string(),
  rating: z.number().min(0).max(100),
  category: z.enum(["frontend", "backend", "tools", "other"]),
});

export type Skill = z.infer<typeof skillSchema>;

export const projectCardSchema = z.object({
  id: z.number(),
  title: z.string(),
  metric: z.string(),
  color: z.string(),
  icon: z.string(),
});

export type ProjectCard = z.infer<typeof projectCardSchema>;

export const newsItemSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  detail: z.string(),
  color: z.string(),
});

export type NewsItem = z.infer<typeof newsItemSchema>;

export const projectSchema = z.object({
  id: z.number(),
  name: z.string(),
  period: z.string(),
  link: z.string(),
});

export type Project = z.infer<typeof projectSchema>;