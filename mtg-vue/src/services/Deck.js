class Deck {
  constructor() {
    this.deck = {};
    this.manaCosts = {};
    this.colors = {};

    this.colorNames = {
      'W': "White",
      'U': "Blue",
      'B': "Black",
      'R': "Red",
      'G': "Green",
      'C': "Colorless",
    };

    for (let i = 1; i <= 6; i++) {
      this.manaCosts[i] = 0;
    }
    this.manaCosts["7+"] = 0;
  }

  addToDeck(card) {
    if (this.getTotalCount() >= 60) {
      throw new Error('Deck is full');
    }

    const countCard = this.cardCount(card);

    if (!card.types.includes('Land') && countCard >= 4) {
      throw new Error('More than 4 copies of this card are already in the deck');
    }

    if (this.deck[card.name]) {
      this.deck[card.name].count += 1;
    } else {
      this.deck[card.name] = { card: card, count: 1 };
    }

    const fullColor = this.colorNames[card.colors] || card.colors;
    this.colors[fullColor] = (this.colors[fullColor] || 0) + 1;

    this.processManaCosts(card.manaCost);
  }

  removeCard(card) {
    if (this.deck[card.name]) {
      const fullColor = this.colorNames[card.colors] || card.colors;

      if (this.deck[card.name].count > 1) {
        this.deck[card.name].count -= 1;
      } else {
        delete this.deck[card.name];
      }

      this.colors[fullColor]--;

      this.processManaCosts(card.manaCost, -1);
    }
  }

  cardCount(card) {
    return this.deck[card.name] ? this.deck[card.name].count : 0;
  }

  getTotalCount() {
    return Object.values(this.deck).reduce((sum, cardEntry) => sum + cardEntry.count, 0);
  }

  getDeck() {
    return Object.values(this.deck);
  }

  getManaCosts() {
    return this.formatManaData();
  }

  getColors() {
    return this.formatColorData();
  }

  formatColorData() {
    return Object.entries(this.colors).map(([color, count]) => ({ color, count }));
  }

  formatManaData() {
    return Object.entries(this.manaCosts).map(([cost, count]) => ({ cost, count }));
  }

  processManaCosts(manaCost, sign = 1) {
    const manaRegex = /(\d+)/g;
    const match = manaRegex.exec(manaCost);
    if (match) {
      const cost = parseInt(match[0], 10);
      if (cost <= 6) {
        this.manaCosts[cost] += 1 * sign;
      }
    } else {
      this.manaCosts["7+"] += 1 * sign;
    }
  }
}

export { Deck };
