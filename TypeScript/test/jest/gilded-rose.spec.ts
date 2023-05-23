import { Item, GildedRose } from "@/gilded-rose";

describe("Gilded Rose", () => {
  it("should decrease sellIn for items that are not Sulfuras", () => {
    const gildedRose = new GildedRose([
      new Item("Sulfuras, Hand of Ragnaros", 5, 6),
      new Item("Aged Brie", 2, 3),
    ]);
    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).toBe(5);
    expect(items[1].sellIn).toBe(1);
  });

  it("should not change quality for Sulfuras", () => {
    const gildedRose = new GildedRose([
      new Item("Sulfuras, Hand of Ragnaros", 5, 6),
    ]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(6);
  });

  it("should decrease quality by 1 for items other than Aged Brie, Sulfuras, Conjured or Backstage", () => {
    const gildedRose = new GildedRose([
      new Item("Sulfuras, Hand of Ragnaros", 1, 2),
      new Item("Aged Brie", 5, 6),
      new Item("Backstage passes to a TAFKAL80ETC concert", 15, 9),
      new Item("Conjured Mana Cake", 3, 6),
      new Item("Elixir of the Mongoose", 30, 20),
    ]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).not.toBe(1);
    expect(items[1].quality).not.toBe(5);
    expect(items[2].quality).not.toBe(8);
    expect(items[3].quality).not.toBe(5);
    expect(items[4].quality).toBe(19);
  });

  it("should decrease quality by 2 for Conjured or items that are past the sellIn date", () => {
    const gildedRose = new GildedRose([
      new Item("Conjured Mana Cake", 3, 6),
      new Item("Elixir of the Mongoose", 30, 20),
      new Item("+5 Dexterity Vest", -1, 20),
    ]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(4);
    expect(items[1].quality).toBe(19);
    expect(items[2].quality).toBe(18);
  });

  it("should increase quality by 1 for Aged Brie", () => {
    const gildedRose = new GildedRose([new Item("Aged Brie", 2, 3)]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(4);
  });

  it("should increase quality by 3 for Backstage if sellBy > 0 && <= 5", () => {
    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 9),
    ]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(12);
  });

  it("should increase quality by 2 for Backstage if sellBy > 5 & <= 10", () => {
    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 9),
    ]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(11);
  });

  it("should increase quality by 1 for Backstage if sellBy > 10", () => {
    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 15, 9),
    ]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(10);
  });

  it("should set quality to 0 for Backstage if pass concert date (sellBy <= 0)", () => {
    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", -2, 9),
    ]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(0);
  });
});
