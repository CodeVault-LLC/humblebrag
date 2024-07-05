export interface RegexPattern {
  pattern: RegExp;
  name: string;
  description: string;
  category: Category;
  subCategory?: SubCategory; // Optional subcategory for more detail
}

export interface Secret {
  pattern: {
    name: string;
    category: Category;
    subCategory?: SubCategory;
    description: string;
  };
  results: string[];
}
