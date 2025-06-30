import { pgTable, serial, text, timestamp, integer, varchar, boolean } from "drizzle-orm/pg-core";

export const blogs = pgTable('blogs', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content').notNull(),
  authorName: varchar('author_name', { length: 100 }).notNull(),
  authorEmail: varchar('author_email', { length: 100 }).notNull(),
  carModel: varchar('car_model', { length: 100 }),
  carBrand: varchar('car_brand', { length: 50 }),
  publishedAt: timestamp('published_at'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  status: varchar('status', { length: 20 }).default('draft'),
  featuredImageUrl: text('featured_image_url'),
});

export const reviews = pgTable('reviews', {
  id: serial('id').primaryKey(),
  carModel: varchar('car_model', { length: 100 }).notNull(),
  carBrand: varchar('car_brand', { length: 50 }).notNull(),
  reviewerName: varchar('reviewer_name', { length: 100 }).notNull(),
  reviewerEmail: varchar('reviewer_email', { length: 100 }).notNull(),
  rating: integer('rating').notNull(),
  reviewText: text('review_text').notNull(),
  purchaseDate: timestamp('purchase_date'),
  verifiedPurchase: boolean('verified_purchase').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  helpfulCount: integer('helpful_count').default(0),
});
