export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  // items: Array<Item>;
  items: Item[];

  // constructor(items = [] as Array<Item>) {
  constructor(items = [] as Item[]) {
    this.items = items;
  }

  // EXTRACT LOGIC INTO SEPARATE FUNCTIONS TO INCREASE READABILITY
  async descreaseSellIn(index: number) {
    // 	- "Sulfuras", being a legendary item, never has to be sold or decreases in Quality
    if (this.items[index].name != "Sulfuras, Hand of Ragnaros")
      this.items[index].sellIn -= 1;
  }

  changeQuality(index: number) {
    // 	- "Sulfuras", being a legendary item, never has to be sold or decreases in Quality
    if (this.items[index].name == "Sulfuras, Hand of Ragnaros") return;

    // 	- The Quality of an item is never more than 50
    //	- The Quality of an item is never negative
    if (this.items[index].quality < 50 && this.items[index].quality >= 1) {
      // 	- "Aged Brie" actually increases in Quality the older it gets
      if (this.items[index].name == "Aged Brie") {
        return (this.items[index].quality += 1);
      }

      /**
      "Backstage passes", like aged brie, increases in Quality as its SellIn value approaches;
      Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but
      Quality drops to 0 after the concert
      */
      if (
        this.items[index].name == "Backstage passes to a TAFKAL80ETC concert"
      ) {
        // 0 after concert
        if (this.items[index].sellIn < 0) {
          return (this.items[index].quality = 0);
        }
        // 5 days or less
        if (this.items[index].sellIn <= 5) {
          return (this.items[index].quality += 3);
        }

        // 10 days or less
        if (this.items[index].sellIn <= 10) {
          return (this.items[index].quality += 2);
        }

        return (this.items[index].quality += 1);
      }

      // 	- Once the sell by date has passed, Quality degrades twice as fast
      // 	- "Conjured" items degrade in Quality twice as fast as normal items
      if (
        this.items[index].sellIn <= 0 ||
        this.items[index].name == "Conjured Mana Cake"
      ) {
        this.items[index].quality -= 2;
      } else {
        console.log(this.items[index]);

        this.items[index].quality -= 1;
      }
    }
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      this.descreaseSellIn(i);
      this.changeQuality(i);
    }
    return this.items;
  }
}
