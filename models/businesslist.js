class businesslist {
  constructor(
    id,
    itemName,
    quantity,
    usualPrice,
    newPrice,
    image,
    foodCountdown
  ) {
    this.id = id;
    this.itemName = itemName;
    this.quantity = quantity;
    this.usualPrice = usualPrice;
    this.newPrice = newPrice;
    this.image = image;
    this.foodCountdown = foodCountdown;
  }
}

export default businesslist;
