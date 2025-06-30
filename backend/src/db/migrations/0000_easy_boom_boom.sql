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
