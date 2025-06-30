CREATE TABLE "blogs" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"content" text NOT NULL,
	"author_name" varchar(100) NOT NULL,
	"author_email" varchar(100) NOT NULL,
	"car_model" varchar(100),
	"car_brand" varchar(50),
	"published_at" timestamp,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"status" varchar(20) DEFAULT 'draft',
	"featured_image_url" text
);
--> statement-breakpoint
CREATE TABLE "car_images" (
	"id" serial PRIMARY KEY NOT NULL,
	"car_id" integer NOT NULL,
	"image_url" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "car_listings" (
	"id" serial PRIMARY KEY NOT NULL,
	"listing_title" varchar(255) NOT NULL,
	"tagline" varchar(255),
	"original_price" integer,
	"selling_price" integer NOT NULL,
	"category" varchar(50) NOT NULL,
	"condition" varchar(50) NOT NULL,
	"offer_type" varchar(50),
	"make" varchar(100) NOT NULL,
	"model" varchar(100) NOT NULL,
	"year" integer NOT NULL,
	"drive_type" varchar(20) NOT NULL,
	"transmission" varchar(20) NOT NULL,
	"fuel_type" varchar(20) NOT NULL,
	"mileage" integer NOT NULL,
	"engine_size" varchar(50),
	"cylinder" integer,
	"color" varchar(30) NOT NULL,
	"door" integer NOT NULL,
	"vin" varchar(100),
	"listing_description" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "reviews" (
	"id" serial PRIMARY KEY NOT NULL,
	"car_model" varchar(100) NOT NULL,
	"car_brand" varchar(50) NOT NULL,
	"reviewer_name" varchar(100) NOT NULL,
	"reviewer_email" varchar(100) NOT NULL,
	"rating" integer NOT NULL,
	"review_text" text NOT NULL,
	"purchase_date" timestamp,
	"verified_purchase" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"helpful_count" integer DEFAULT 0
);
--> statement-breakpoint
ALTER TABLE "car_images" ADD CONSTRAINT "car_images_car_id_car_listings_id_fk" FOREIGN KEY ("car_id") REFERENCES "public"."car_listings"("id") ON DELETE cascade ON UPDATE no action;