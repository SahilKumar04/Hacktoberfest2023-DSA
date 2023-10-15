class HashTable<K, V> {
  private table: Array<Array<[K, V]>>;

  constructor(size: number) {
    this.table = new Array(size);
  }

  private hash(key: K): number {
    const hashString = String(key);
    let hash = 0;

    for (let i = 0; i < hashString.length; i++) {
      hash += hashString.charCodeAt(i);
    }

    return hash % this.table.length;
  }

  put(key: K, value: V): void {
    const index = this.hash(key);

    if (!this.table[index]) {
      this.table[index] = [];
    }

    const bucket = this.table[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket[i][1] = value; // Update the value if the key already exists
        return;
      }
    }

    bucket.push([key, value]);
  }

  get(key: K): V | undefined {
    const index = this.hash(key);
    const bucket = this.table[index];

    if (bucket) {
      for (const [k, v] of bucket) {
        if (k === key) {
          return v;
        }
      }
    }

    return undefined; // Key not found
  }

  remove(key: K): void {
    const index = this.hash(key);
    const bucket = this.table[index];

    if (bucket) {
      this.table[index] = bucket.filter(([k]) => k !== key);
    }
  }
}

// Creating a hash table
const hashTable = new HashTable<string, number>(10);

// Inserting key-value pairs
hashTable.put("apple", 5);
hashTable.put("banana", 3);
hashTable.put("cherry", 8);

// Retrieving values
console.log("Value for 'apple':", hashTable.get("apple")); // Should return 5
console.log("Value for 'grape':", hashTable.get("grape")); // Should return undefined

// Removing a key-value pair
hashTable.remove("banana");

console.log("Value for 'banana':", hashTable.get("banana")); // Should return undefined
