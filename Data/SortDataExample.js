import category from "../models/category";

export const CATEGORIES = [
  new category("c1", "Italian", require("../assets/Images/Italian.jpg")),
  new category("c2", "French", require("../assets/Images/French.jpg")),
  new category("c3", "Chipper", require("../assets/Images/Chipper.jpg")),
  new category("c4", "Chinese", require("../assets/Images/Chinese.jpg")),
  new category("c5", "Healthy", require("../assets/Images/Healthy.jpg")),
  new category("c6", "Bakery", require("../assets/Images/Bakery.jpg")),
  new category("c7", "Breakfast", require("../assets/Images/Breakfast.jpg")),
  new category("c8", "Mexican", require("../assets/Images/Mexican.jpg")),
];
