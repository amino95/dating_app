export const FOOD_OPTIONS = [
  { value: "pizza", label: "Pizza", emoji: "🍕" },
  { value: "burger", label: "Burger", emoji: "🍔" },
  { value: "sushi", label: "Sushi", emoji: "🍣" },
  { value: "tacos", label: "Tacos", emoji: "🌮" },
  { value: "italian", label: "Italian", emoji: "🍝" },
  { value: "bbq", label: "BBQ", emoji: "🍖" },
  { value: "vegan", label: "Vegan", emoji: "🥗" },
  { value: "other", label: "Something else", emoji: "🍽️" },
] as const;

export type FoodValue = (typeof FOOD_OPTIONS)[number]["value"];
