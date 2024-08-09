/**
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
export function change(amount, coins) {
  const cache = Array.from({ length: amount + 1 }, () => 0);

  cache[0] = 1;

  for (const coin of coins) {
    for (let a = coin; a <= amount; a++) {
      cache[a] += cache[a - coin];
    }
  }

  return cache[amount];
}

export function suboptimal(amount, coins) {
  const cache = new Cache();

  return combinations(cache, amount, coins, 0);
}

class Cache {
  constructor() {
    this.cache = new Map();
  }

  #createKey(amount, coin) {
    return `${amount}-${coin}`;
  }

  set(amount, coin, result) {
    this.cache.set(this.#createKey(amount, coin), result);
  }

  get(amount, coin) {
    return this.cache.get(this.#createKey(amount, coin));
  }

  has(amount, coin) {
    return this.cache.has(this.#createKey(amount, coin));
  }
}

function combinations(cache, amount, coins, index) {
  if (index == coins.length) {
    return amount === 0 ? 1 : 0;
  }

  if (cache.has(amount, coins[index])) {
    return cache.get(amount, coins[index]);
  }

  const take =
    amount < coins[index]
      ? 0
      : combinations(cache, amount - coins[index], coins, index);

  const skip = combinations(cache, amount, coins, index + 1);

  const result = take + skip;
  cache.set(amount, coins[index], result);

  return result;
}
