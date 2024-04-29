export interface Snippet {
  id: string;
  title: string;
  code: string;
  codeHtml?: string;
  language: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  postedAt: string;
  user: {
    id: string;
    username: string;
    displayName: string;
    imageUrl?: string;
  };
}

const mockSnippets: Snippet[] = [
  {
    id: "1",
    title: "Hello, World!",
    code: `console.log("Hello, World!");`,
    language: "javascript",
    viewCount: 123,
    likeCount: 12,
    commentCount: 1,
    postedAt: "Jan 1, 2024",
    user: {
      id: "1",
      username: "Alice",
      displayName: "Alice",
      imageUrl: "https://i.pravatar.cc/300?img=1",
    },
  },
  {
    id: "2",
    title: "Sum of Numbers",
    code: `let numbers = [1, 2, 3, 4, 5];
let sum = 0;
for (let number of numbers) {
  sum += number;
}
console.log(sum);
`,
    language: "javascript",
    viewCount: 456,
    likeCount: 34,
    commentCount: 2,
    postedAt: "Jan 2, 2024",
    user: {
      id: "2",
      username: "Bob",
      displayName: "Bob",
      imageUrl: "https://i.pravatar.cc/300?img=2",
    },
  },
  {
    id: "3",
    title: "Greet",
    code: `function greet(name) {
  console.log("Hello, " + name + "!");
}
greet("Alice");
`,
    language: "javascript",
    viewCount: 789,
    likeCount: 56,
    commentCount: 3,
    postedAt: "Jan 3, 2024",
    user: {
      id: "3",
      username: "Charlie",
      displayName: "Charlie",
      imageUrl: "https://i.pravatar.cc/300?img=3",
    },
  },
  {
    id: "4",
    title: "Person",
    code: `let person = {
  name: "Bob",
  age: 30
};
console.log(person.name + " is " + person.age + " years old.");
`,
    language: "javascript",
    viewCount: 101,
    likeCount: 78,
    commentCount: 4,
    postedAt: "Jan 4, 2024",
    user: {
      id: "4",
      username: "Dave",
      displayName: "Dave",
      imageUrl: "https://i.pravatar.cc/300?img=4",
    },
  },
  {
    id: "5",
    title: "Pass or Fail",
    code: `let score = 75;
if (score >= 70) {
  console.log("Passed");
} else {
  console.log("Failed");
}
`,
    language: "javascript",
    viewCount: 202,
    likeCount: 90,
    commentCount: 5,
    postedAt: "Jan 5, 2024",
    user: {
      id: "5",
      username: "Eve",
      displayName: "Eve",
      imageUrl: "https://i.pravatar.cc/300?img=5",
    },
  },
  {
    id: "6",
    title: "Doubled Numbers",
    code: `let numbers = [1, 2, 3, 4, 5];
let doubledNumbers = numbers.map(number => number * 2);
console.log(doubledNumbers);
`,
    language: "javascript",
    viewCount: 303,
    likeCount: 123,
    commentCount: 6,
    postedAt: "Jan 6, 2024",
    user: {
      id: "6",
      username: "Frank",
      displayName: "Frank",
      imageUrl: "https://i.pravatar.cc/300?img=6",
    },
  },
  {
    id: "7",
    title: "Young People",
    code: `let people = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 28 }
];
let youngPeople = people.filter(person => person.age < 30);
console.log(youngPeople);
`,
    language: "javascript",
    viewCount: 404,
    likeCount: 234,
    commentCount: 7,
    postedAt: "Jan 7, 2024",
    user: {
      id: "7",
      username: "Grace",
      displayName: "Grace",
      imageUrl: "https://i.pravatar.cc/300?img=7",
    },
  },
  {
    id: "8",
    title: "Greeting",
    code: `let name = "Dave";
let greeting = \`Hello, \${name}! How are you?\`;
console.log(greeting);
`,
    language: "javascript",
    viewCount: 505,
    likeCount: 345,
    commentCount: 8,
    postedAt: "Jan 8, 2024",
    user: {
      id: "8",
      username: "Helen",
      displayName: "Helen",
      imageUrl: "https://i.pravatar.cc/300?img=8",
    },
  },
  {
    id: "9",
    title: "Async Hello World",
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
    viewCount: 606,
    likeCount: 456,
    commentCount: 9,
    postedAt: "Jan 9, 2024",
    user: {
      id: "9",
      username: "Ivy",
      displayName: "Ivy",
      imageUrl: "https://i.pravatar.cc/300?img=9",
    },
  },
  {
    id: "10",
    title: "Person Class",
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
    viewCount: 707,
    likeCount: 567,
    commentCount: 10,
    postedAt: "Jan 10, 2024",
    user: {
      id: "10",
      username: "Jack",
      displayName: "Jack",
      imageUrl: "https://i.pravatar.cc/300?img=10",
    },
  },
  {
    id: "11",
    title: "Fruits",
    code: `const fruits = ['apple', 'banana', 'cherry'];
fruits.forEach(fruit => {
  console.log(fruit);
});
`,
    language: "javascript",
    viewCount: 808,
    likeCount: 678,
    commentCount: 11,
    postedAt: "Jan 11, 2024",
    user: {
      id: "11",
      username: "Kevin",
      displayName: "Kevin",
      imageUrl: "https://i.pravatar.cc/300?img=11",
    },
  },
  {
    id: "12",
    title: "Find User",
    code: `const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' }
];
const user = users.find(user => user.id === 2);
console.log(user.name); // "Bob"
`,
    language: "javascript",
    viewCount: 909,
    likeCount: 789,
    commentCount: 12,
    postedAt: "Jan 12, 2024",
    user: {
      id: "12",
      username: "Lily",
      displayName: "Lily",
      imageUrl: "https://i.pravatar.cc/300?img=12",
    },
  },
  {
    id: "13",
    title: "Counter Class",
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
    viewCount: 1010,
    likeCount: 890,
    commentCount: 13,
    postedAt: "Jan 13, 2024",
    user: {
      id: "13",
      username: "Mike",
      displayName: "Mike",
      imageUrl: "https://i.pravatar.cc/300?img=13",
    },
  },
  {
    id: "14",
    title: "Set Timeout",
    code: `console.log('Start');
setTimeout(() => {
  console.log('This runs after 2 seconds');
}, 2000);
console.log('End');
`,
    language: "javascript",
    viewCount: 1111,
    likeCount: 901,
    commentCount: 14,
    postedAt: "Jan 14, 2024",
    user: {
      id: "14",
      username: "Nancy",
      displayName: "Nancy",
      imageUrl: "https://i.pravatar.cc/300?img=14",
    },
  },
  {
    id: "15",
    title: "Combine Arrays",
    code: `const first = [1, 2, 3];
const second = [4, 5, 6];
const combined = [...first, ...second];
console.log(combined);
`,
    language: "javascript",
    viewCount: 1212,
    likeCount: 911,
    commentCount: 15,
    postedAt: "Jan 15, 2024",
    user: {
      id: "15",
      username: "Oscar",
      displayName: "Oscar",
      imageUrl: "https://i.pravatar.cc/300?img=15",
    },
  },
  {
    id: "16",
    title: "Destructuring",
    code: `const person = {
  name: 'Dave',
  age: 34
};
const { name, age } = person;
console.log(name); // "Dave"
console.log(age); // 34
`,
    language: "javascript",
    viewCount: 1313,
    likeCount: 912,
    commentCount: 16,
    postedAt: "Jan 16, 2024",
    user: {
      id: "16",
      username: "Patty",
      displayName: "Patty",
      imageUrl: "https://i.pravatar.cc/300?img=16",
    },
  },
  {
    id: "17",
    title: "Sum of Numbers",
    code: `const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
console.log(sum); // 15
`,
    language: "javascript",
    viewCount: 1414,
    likeCount: 913,
    commentCount: 17,
    postedAt: "Jan 17, 2024",
    user: {
      id: "17",
      username: "Quincy",
      displayName: "Quincy",
      imageUrl: "https://i.pravatar.cc/300?img=17",
    },
  },
  {
    id: "18",
    title: "Multi-line String",
    code: `const greeting = \`Hello,
This is a multi-line string!
Goodbye!\`;
console.log(greeting);
`,
    language: "javascript",
    viewCount: 1515,
    likeCount: 914,
    commentCount: 18,
    postedAt: "Jan 18, 2024",
    user: {
      id: "18",
      username: "Roger",
      displayName: "Roger",
      imageUrl: "https://i.pravatar.cc/300?img=18",
    },
  },
  {
    id: "19",
    title: "Dynamic Object",
    code: `const key = "color";
const value = "blue";
const dynamicObject = {
  [key]: value
};
console.log(dynamicObject.color); // "blue"
`,
    language: "javascript",
    viewCount: 1616,
    likeCount: 915,
    commentCount: 19,
    postedAt: "Jan 19, 2024",
    user: {
      id: "19",
      username: "Sally",
      displayName: "Sally",
      imageUrl: "https://i.pravatar.cc/300?img=19",
    },
  },
  {
    id: "20",
    title: "Promise Chain",
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
    viewCount: 1717,
    likeCount: 916,
    commentCount: 20,
    postedAt: "Jan 20, 2024",
    user: {
      id: "20",
      username: "Tom",
      displayName: "Tom",
      imageUrl: "https://i.pravatar.cc/300?img=20",
    },
  },
  {
    id: "21",
    title: "Array from String",
    code: `const str = 'hello';
const letters = Array.from(str);
console.log(letters); // ['h', 'e', 'l', 'l', 'o']
`,
    language: "javascript",
    viewCount: 1818,
    likeCount: 917,
    commentCount: 21,
    postedAt: "Jan 21, 2024",
    user: {
      id: "21",
      username: "Uma",
      displayName: "Uma",
      imageUrl: "https://i.pravatar.cc/300?img=21",
    },
  },
  {
    id: "22",
    title: "Map and Set",
    code: `const fruits = new Map([
  ['apples', 5],
  ['bananas', 10],
  ['oranges', 3]
]);

fruits.set('cherries', 7);
console.log(fruits.get('bananas')); // 10
`,
    language: "javascript",
    viewCount: 1919,
    likeCount: 918,
    commentCount: 22,
    postedAt: "Jan 22, 2024",
    user: {
      id: "22",
      username: "Victor",
      displayName: "Victor",
      imageUrl: "https://i.pravatar.cc/300?img=22",
    },
  },
  {
    id: "23",
    title: "Set",
    code: `const numbers = new Set([1, 2, 3, 4, 4, 2]);
console.log(numbers); // Set {1, 2, 3, 4}
`,
    language: "javascript",
    viewCount: 2020,
    likeCount: 919,
    commentCount: 23,
    postedAt: "Jan 23, 2024",
    user: {
      id: "23",
      username: "Wendy",
      displayName: "Wendy",
      imageUrl: "https://i.pravatar.cc/300?img=23",
    },
  },
  {
    id: "24",
    title: "Destructuring Array",
    code: `const [first, second, , fourth] = [1, 2, 3, 4];
console.log(first); // 1
console.log(second); // 2
console.log(fourth); // 4
`,
    language: "javascript",
    viewCount: 2121,
    likeCount: 920,
    commentCount: 24,
    postedAt: "Jan 24, 2024",
    user: {
      id: "24",
      username: "Xavier",
      displayName: "Xavier",
      imageUrl: "https://i.pravatar.cc/300?img=24",
    },
  },
  {
    id: "25",
    title: "Fetch Data",
    code: `fetch('https://api.example.com/data')
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
`,
    language: "javascript",
    viewCount: 2222,
    likeCount: 921,
    commentCount: 25,
    postedAt: "Jan 25, 2024",
    user: {
      id: "25",
      username: "Yvonne",
      displayName: "Yvonne",
      imageUrl: "https://i.pravatar.cc/300?img=25",
    },
  },
  {
    id: "26",
    title: "Arrow Function",
    code: `const add = (a, b) => a + b;
console.log(add(5, 3)); // 8
`,
    language: "javascript",
    viewCount: 2323,
    likeCount: 922,
    commentCount: 26,
    postedAt: "Jan 26, 2024",
    user: {
      id: "26",
      username: "Zack",
      displayName: "Zack",
      imageUrl: "https://i.pravatar.cc/300?img=26",
    },
  },
  {
    id: "27",
    title: "Async Await",
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
    viewCount: 2424,
    likeCount: 923,
    commentCount: 27,
    postedAt: "Jan 27, 2024",
    user: {
      id: "27",
      username: "Alice",
      displayName: "Alice",
      imageUrl: "https://i.pravatar.cc/300?img=1",
    },
  },
  {
    id: "28",
    title: "Object Literal",
    code: `const name = 'Alice';
const age = 25;

const person = { name, age };
console.log(person); // { name: 'Alice', age: 25 }
`,
    language: "javascript",
    viewCount: 2525,
    likeCount: 924,
    commentCount: 28,
    postedAt: "Jan 28, 2024",
    user: {
      id: "28",
      username: "Bob",
      displayName: "Bob",
      imageUrl: "https://i.pravatar.cc/300?img=2",
    },
  },
  {
    id: "29",
    title: "For In Loop",
    code: `const person = { name: 'Bob', age: 30, city: 'New York' };
for (const key in person) {
  console.log(\`\${key}: \${person[key]}\`);
}
`,
    language: "javascript",
    viewCount: 2626,
    likeCount: 925,
    commentCount: 29,
    postedAt: "Jan 29, 2024",
    user: {
      id: "29",
      username: "Charlie",
      displayName: "Charlie",
      imageUrl: "https://i.pravatar.cc/300?img=3",
    },
  },
  {
    id: "30",
    title: "For Of Loop",
    code: `const colors = ['red', 'green', 'blue'];
for (const color of colors) {
  console.log(color);
}
`,
    language: "javascript",
    viewCount: 2727,
    likeCount: 926,
    commentCount: 30,
    postedAt: "Jan 30, 2024",
    user: {
      id: "30",
      username: "Dave",
      displayName: "Dave",
      imageUrl: "https://i.pravatar.cc/300?img=4",
    },
  },
];

export async function getSnippets() {
  return mockSnippets;
}
