import { pgTable, serial, text, timestamp, integer, varchar, boolean ,foreignKey} from "drizzle-orm/pg-core";

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

export const carListings = pgTable('car_listings', {
  id: serial('id').primaryKey(),

  listingTitle: varchar('listing_title', { length: 255 }).notNull(),
  tagline: varchar('tagline', { length: 255 }),
  originalPrice: integer('original_price'),
  sellingPrice: integer('selling_price').notNull(),

  category: varchar('category', { length: 50 }).notNull(),
  condition: varchar('condition', { length: 50 }).notNull(),
  offerType: varchar('offer_type', { length: 50 }),

  make: varchar('make', { length: 100 }).notNull(),
  model: varchar('model', { length: 100 }).notNull(),
  year: integer('year').notNull(),
  driveType: varchar('drive_type', { length: 20 }).notNull(),
  transmission: varchar('transmission', { length: 20 }).notNull(),
  fuelType: varchar('fuel_type', { length: 20 }).notNull(),
  mileage: integer('mileage').notNull(),
  engineSize: varchar('engine_size', { length: 50 }),
  cylinder: integer('cylinder'),
  color: varchar('color', { length: 30 }).notNull(),
  door: integer('door').notNull(),
  vin: varchar('vin', { length: 100 }),

  listingDescription: text('listing_description').notNull(),

  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const carImages = pgTable('car_images', {
  id: serial('id').primaryKey(),

  carId: integer('car_id')
    .notNull()
    .references(() => carListings.id, { onDelete: 'cascade' }),

  imageUrl: text('image_url').notNull(),
});

