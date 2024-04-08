export interface Post {
  id: string;
  code: string;
  codeHtml?: string;
  language: string;
  likeCount: number;
  user: {
    id: string;
    username: string;
    displayName: string;
    imageUrl?: string;
  };
}

const mockPosts: Post[] = [
  {
    id: "1",
    code: `console.log("Hello, World!");`,
    language: "javascript",
    likeCount: 123,
    user: {
      id: "1",
      username: "Alice",
      displayName: "Alice",
      imageUrl: "https://i.pravatar.cc/300?img=1",
    },
  },
  {
    id: "2",
    code: `let numbers = [1, 2, 3, 4, 5];
let sum = 0;
for (let number of numbers) {
  sum += number;
}
console.log(sum);
`,
    language: "javascript",
    likeCount: 456,
    user: {
      id: "2",
      username: "Bob",
      displayName: "Bob",
      imageUrl: "https://i.pravatar.cc/300?img=2",
    },
  },
  {
    id: "3",
    code: `function greet(name) {
  console.log("Hello, " + name + "!");
}
greet("Alice");
`,
    language: "javascript",
    likeCount: 789,
    user: {
      id: "3",
      username: "Charlie",
      displayName: "Charlie",
      imageUrl: "https://i.pravatar.cc/300?img=3",
    },
  },
  {
    id: "4",
    code: `let person = {
  name: "Bob",
  age: 30
};
console.log(person.name + " is " + person.age + " years old.");
`,
    language: "javascript",
    likeCount: 101,
    user: {
      id: "4",
      username: "Dave",
      displayName: "Dave",
      imageUrl: "https://i.pravatar.cc/300?img=4",
    },
  },
  {
    id: "5",
    code: `let score = 75;
if (score >= 70) {
  console.log("Passed");
} else {
  console.log("Failed");
}
`,
    language: "javascript",
    likeCount: 202,
    user: {
      id: "5",
      username: "Eve",
      displayName: "Eve",
      imageUrl: "https://i.pravatar.cc/300?img=5",
    },
  },
  {
    id: "6",
    code: `let numbers = [1, 2, 3, 4, 5];
let doubledNumbers = numbers.map(number => number * 2);
console.log(doubledNumbers);
`,
    language: "javascript",
    likeCount: 303,
    user: {
      id: "6",
      username: "Frank",
      displayName: "Frank",
      imageUrl: "https://i.pravatar.cc/300?img=6",
    },
  },
  {
    id: "7",
    code: `let people = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 28 }
];
let youngPeople = people.filter(person => person.age < 30);
console.log(youngPeople);
`,
    language: "javascript",
    likeCount: 404,
    user: {
      id: "7",
      username: "Grace",
      displayName: "Grace",
      imageUrl: "https://i.pravatar.cc/300?img=7",
    },
  },
  {
    id: "8",
    code: `let name = "Dave";
let greeting = \`Hello, \${name}! How are you?\`;
console.log(greeting);
`,
    language: "javascript",
    likeCount: 505,
    user: {
      id: "8",
      username: "Helen",
      displayName: "Helen",
      imageUrl: "https://i.pravatar.cc/300?img=8",
    },
  },
  {
    id: "9",
    code: `function asyncFunction() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Async Hello world");
    }, 1000);
  });
}
asyncFunction().then(console.log);
`,
    language: "javascript",
    likeCount: 606,
    user: {
      id: "9",
      username: "Ivy",
      displayName: "Ivy",
      imageUrl: "https://i.pravatar.cc/300?img=9",
    },
  },
  {
    id: "10",
    code: `class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  describe() {
    console.log(\`\${this.name} is \${this.age} years old.\`);
  }
}
const alice = new Person("Alice", 25);
alice.describe();
`,
    language: "javascript",
    likeCount: 707,
    user: {
      id: "10",
      username: "Jack",
      displayName: "Jack",
      imageUrl: "https://i.pravatar.cc/300?img=10",
    },
  },
  {
    id: "11",
    code: `const fruits = ['apple', 'banana', 'cherry'];
fruits.forEach(fruit => {
  console.log(fruit);
});
`,
    language: "javascript",
    likeCount: 808,
    user: {
      id: "11",
      username: "Kevin",
      displayName: "Kevin",
      imageUrl: "https://i.pravatar.cc/300?img=11",
    },
  },
  {
    id: "12",
    code: `const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' }
];
const user = users.find(user => user.id === 2);
console.log(user.name); // "Bob"
`,
    language: "javascript",
    likeCount: 909,
    user: {
      id: "12",
      username: "Lily",
      displayName: "Lily",
      imageUrl: "https://i.pravatar.cc/300?img=12",
    },
  },
  {
    id: "13",
    code: `class Counter {
  constructor() {
    this.count = 0;
  }
  increment() {
    this.count += 1;
    console.log(this.count);
  }
}
const counter = new Counter();
counter.increment(); // 1
counter.increment(); // 2
`,
    language: "javascript",
    likeCount: 1010,
    user: {
      id: "13",
      username: "Mike",
      displayName: "Mike",
      imageUrl: "https://i.pravatar.cc/300?img=13",
    },
  },
  {
    id: "14",
    code: `console.log('Start');
setTimeout(() => {
  console.log('This runs after 2 seconds');
}, 2000);
console.log('End');
`,
    language: "javascript",
    likeCount: 1111,
    user: {
      id: "14",
      username: "Nancy",
      displayName: "Nancy",
      imageUrl: "https://i.pravatar.cc/300?img=14",
    },
  },
  {
    id: "15",
    code: `const first = [1, 2, 3];
const second = [4, 5, 6];
const combined = [...first, ...second];
console.log(combined);
`,
    language: "javascript",
    likeCount: 1212,
    user: {
      id: "15",
      username: "Oscar",
      displayName: "Oscar",
      imageUrl: "https://i.pravatar.cc/300?img=15",
    },
  },
  {
    id: "16",
    code: `const person = {
  name: 'Dave',
  age: 34
};
const { name, age } = person;
console.log(name); // "Dave"
console.log(age); // 34
`,
    language: "javascript",
    likeCount: 1313,
    user: {
      id: "16",
      username: "Patty",
      displayName: "Patty",
      imageUrl: "https://i.pravatar.cc/300?img=16",
    },
  },
  {
    id: "17",
    code: `const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
console.log(sum); // 15
`,
    language: "javascript",
    likeCount: 1414,
    user: {
      id: "17",
      username: "Quincy",
      displayName: "Quincy",
      imageUrl: "https://i.pravatar.cc/300?img=17",
    },
  },
  {
    id: "18",
    code: `const greeting = \`Hello,
This is a multi-line string!
Goodbye!\`;
console.log(greeting);
`,
    language: "javascript",
    likeCount: 1515,
    user: {
      id: "18",
      username: "Roger",
      displayName: "Roger",
      imageUrl: "https://i.pravatar.cc/300?img=18",
    },
  },
  {
    id: "19",
    code: `const key = "color";
const value = "blue";
const dynamicObject = {
  [key]: value
};
console.log(dynamicObject.color); // "blue"
`,
    language: "javascript",
    likeCount: 1616,
    user: {
      id: "19",
      username: "Sally",
      displayName: "Sally",
      imageUrl: "https://i.pravatar.cc/300?img=19",
    },
  },
  {
    id: "20",
    code: `function doubleAfter2Seconds(x) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(x * 2);
    }, 2000);
  });
}

doubleAfter2Seconds(10).then((result) => {
  console.log(result);  // 20
  return doubleAfter2Seconds(20);
}).then((result) => {
  console.log(result);  // 40
  return doubleAfter2Seconds(30);
}).then(result => {
  console.log(result);  // 60
});
`,
    language: "javascript",
    likeCount: 1717,
    user: {
      id: "20",
      username: "Tom",
      displayName: "Tom",
      imageUrl: "https://i.pravatar.cc/300?img=20",
    },
  },
  {
    id: "21",
    code: `const str = 'hello';
const letters = Array.from(str);
console.log(letters); // ['h', 'e', 'l', 'l', 'o']
`,
    language: "javascript",
    likeCount: 1818,
    user: {
      id: "21",
      username: "Uma",
      displayName: "Uma",
      imageUrl: "https://i.pravatar.cc/300?img=21",
    },
  },
  {
    id: "22",
    code: `const fruits = new Map([
  ['apples', 5],
  ['bananas', 10],
  ['oranges', 3]
]);

fruits.set('cherries', 7);
console.log(fruits.get('bananas')); // 10
`,
    language: "javascript",
    likeCount: 1919,
    user: {
      id: "22",
      username: "Victor",
      displayName: "Victor",
      imageUrl: "https://i.pravatar.cc/300?img=22",
    },
  },
  {
    id: "23",
    code: `const numbers = new Set([1, 2, 3, 4, 4, 2]);
console.log(numbers); // Set {1, 2, 3, 4}
`,
    language: "javascript",
    likeCount: 2020,
    user: {
      id: "23",
      username: "Wendy",
      displayName: "Wendy",
      imageUrl: "https://i.pravatar.cc/300?img=23",
    },
  },
  {
    id: "24",
    code: `const [first, second, , fourth] = [1, 2, 3, 4];
console.log(first); // 1
console.log(second); // 2
console.log(fourth); // 4
`,
    language: "javascript",
    likeCount: 2121,
    user: {
      id: "24",
      username: "Xavier",
      displayName: "Xavier",
      imageUrl: "https://i.pravatar.cc/300?img=24",
    },
  },
  {
    id: "25",
    code: `fetch('https://api.example.com/data')
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
`,
    language: "javascript",
    likeCount: 2222,
    user: {
      id: "25",
      username: "Yvonne",
      displayName: "Yvonne",
      imageUrl: "https://i.pravatar.cc/300?img=25",
    },
  },
  {
    id: "26",
    code: `const add = (a, b) => a + b;
console.log(add(5, 3)); // 8
`,
    language: "javascript",
    likeCount: 2323,
    user: {
      id: "26",
      username: "Zack",
      displayName: "Zack",
      imageUrl: "https://i.pravatar.cc/300?img=26",
    },
  },
  {
    id: "27",
    code: `async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
}

fetchData();
`,
    language: "javascript",
    likeCount: 2424,
    user: {
      id: "27",
      username: "Alice",
      displayName: "Alice",
      imageUrl: "https://i.pravatar.cc/300?img=1",
    },
  },
  {
    id: "28",
    code: `const name = 'Alice';
const age = 25;

const person = { name, age };
console.log(person); // { name: 'Alice', age: 25 }
`,
    language: "javascript",
    likeCount: 2525,
    user: {
      id: "28",
      username: "Bob",
      displayName: "Bob",
      imageUrl: "https://i.pravatar.cc/300?img=2",
    },
  },
  {
    id: "29",
    code: `const person = { name: 'Bob', age: 30, city: 'New York' };
for (const key in person) {
  console.log(\`\${key}: \${person[key]}\`);
}
`,
    language: "javascript",
    likeCount: 2626,
    user: {
      id: "29",
      username: "Charlie",
      displayName: "Charlie",
      imageUrl: "https://i.pravatar.cc/300?img=3",
    },
  },
  {
    id: "30",
    code: `const colors = ['red', 'green', 'blue'];
for (const color of colors) {
  console.log(color);
}
`,
    language: "javascript",
    likeCount: 2727,
    user: {
      id: "30",
      username: "Dave",
      displayName: "Dave",
      imageUrl: "https://i.pravatar.cc/300?img=4",
    },
  },
];

export async function getPosts() {
  return mockPosts;
}
