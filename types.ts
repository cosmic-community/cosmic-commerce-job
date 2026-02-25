// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, unknown>;
  type: string;
  created_at?: string;
  modified_at?: string;
}

// File metafield
export interface CosmicFile {
  url: string;
  imgix_url: string;
}

// Author
export interface Author extends CosmicObject {
  type: 'authors';
  metadata: {
    name: string;
    bio?: string;
    photo?: CosmicFile;
  };
}

// Category
export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    name: string;
    description?: string;
  };
}

// Post
export interface Post extends CosmicObject {
  type: 'posts';
  metadata: {
    content: string;
    featured_image?: CosmicFile;
    author?: Author;
    category?: Category;
  };
}

// Collection
export interface Collection extends CosmicObject {
  type: 'collections';
  metadata: {
    name: string;
    description?: string;
    hero_image?: CosmicFile;
  };
}

// Product
export interface Product extends CosmicObject {
  type: 'products';
  metadata: {
    name: string;
    description?: string;
    price: number;
    sku?: string;
    in_stock?: boolean;
    product_image?: CosmicFile;
    collection?: Collection;
  };
}

// Review - rating comes as select-dropdown object { key, value }
export interface ReviewRating {
  key: string;
  value: string;
}

export interface Review extends CosmicObject {
  type: 'reviews';
  metadata: {
    reviewer_name: string;
    rating: ReviewRating;
    review_text: string;
    product?: Product;
  };
}