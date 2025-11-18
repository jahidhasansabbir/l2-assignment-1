
# 1. What are some differences between interfaces and types in TypeScript?


### **Interface**

Interface হলো এমন একটি টাইপ যা কোনো object বা class-এর structure বা contract নির্ধারণ করে।
* **ব্যবহার:**

  * Object বা class-এর property ও method-এর ধরন নির্ধারণ করতে।
  * একাধিক interface merge করা যায়।
  * ক্লাসে `implements` করে enforce করা যায়।

**উদাহরণ:**

```ts
interface Person {
  name: string;
  age: number;
}

const user: Person = { name: "Sabbir", age: 25 };
```

---

### **Type**

Type হলো একটি নাম দিয়ে কোনো টাইপকে সংজ্ঞায়িত করার উপায়। এটি object, union, intersection, primitive, tuple ইত্যাদি টাইপ ধারণ করতে পারে।
* **ব্যবহার:**

  * Object, union, intersection, primitive, tuple টাইপ সংজ্ঞায়িত করতে।
  * একাধিকবার declare করলে error হবে; merge সমর্থিত নয়।
  * ক্লাসে সরাসরি implement করা যায় না।

**উদাহরণ:**

```ts
type ID = number | string;
type Coordinates = { x: number; y: number };

const userId: ID = 101;
const point: Coordinates = { x: 10, y: 20 };
```

---

### **Interface vs Type পার্থক্য (Table)**

| Interface                              | Type                                                             |
| -------------------------------------- | --------------------------------------------------------------------- |
| Object বা class structure নির্ধারণ করে | Object, union, intersection, primitive, tuple ইত্যাদি টাইপ define করে |
| একাধিকবার declare করা যায়, merge হয়  | একাধিকবার declare করা যায় না, merge সমর্থিত নয়                      |
| `implements` করা যায়                  | সরাসরি implement করা যায় না                                          |
| Object-oriented design, API contracts  | Flexible, complex type composition, union/intersection                |
 | Object shape নির্ধারণ                  | Union, intersection, primitive, tuple                                 |


<br><br>


# 2. What is the use of the keyof keyword in TypeScript? Provide an example.

**keyof**  হলো একটি TypeScript type operator, যা কোনো object type বা interface-এর সমস্ত key-এর union type তৈরি করে। অর্থাৎ এটি object-এর property নামকে type হিসেবে ব্যবহার করার সুযোগ দেয়। এটি type-level programming বা generic programming-এ অত্যন্ত কার্যকর।

## মূল ব্যবহার
1. **Type-safety নিশ্চিত করা**  
   - যখন কোনো ফাংশন বা কোডে object-এর key access করতে হয়, তখন ভুল key use করলে compile-time error দেয়।  
   - এটি runtime error কমায়।  

2. **Generic ফাংশন তৈরিতে সাহায্য**  
   - একই ফাংশন বিভিন্ন object type-এর key ব্যবহার করতে পারে।  
   - Dynamic কিন্তু safe key access সম্ভব।  

3. **Code maintainability বৃদ্ধি করে**  
   - যদি object-এর property পরিবর্তিত হয়, TypeScript compile-time-এ ভুল ধরিয়ে দেয়।  
   - Hard-coded string keys ব্যবহার করার প্রয়োজন কমে।  

## উদাহরণ
```ts
type Person = {
  name: string;
  age: number;
  location: string;
};

// keyof ব্যবহার করলে
type PersonKeys = keyof Person;
// PersonKeys এর type হবে: "name" | "age" | "location"

// practical usage
function getProperty(obj: Person, key: keyof Person) {
  return obj[key];
}

const person: Person = { name: "Sabbir", age: 22, location: "Dhaka" };

const personName = getProperty(person, "name"); // valid
// const invalid = getProperty(person, "salary"); // error, কারণ "salary" Person এর key নয়

```
<br><br>
# 3. Explain the difference between `any`, `unknown`, and `never` types in TypeScript.

TypeScript-এ `any`, `unknown`, এবং `never` তিনটি বিশেষ টাইপ রয়েছে, যাদের ব্যবহার এবং উদ্দেশ্য আলাদা।  

---

## 1. `any`

`any` টাইপ এমন একটি টাইপ যা যেকোনো ধরণের মান গ্রহণ করতে পারে। এটি type-safety বন্ধ করে দেয় এবং ভেরিয়েবল যেকোনো ধরনের মান ধারণ করতে পারে।  

**সমর্থিত মানের উদাহরণ:**
1. Primitive: `number`, `string`, `boolean`, `bigint`, `symbol`, `null`, `undefined`  
2. Object: `object`, `array`, `function`, `class instance`  
3. Complex/custom: `union`, `intersection`, `tuple` ইত্যাদি  

**উদাহরণ:**
```ts
let a: any;

a = 42;          // ঠিক আছে
a = "Hello";     // ঠিক আছে
a.toUpperCase(); // কোনো error নেই, কিন্তু unsafe
```
---
## 2. `unknown`

`unknown` টাইপ যেকোনো মান গ্রহণ করতে পারে, কিন্তু কোনো অপারেশন করার আগে TypeScript চেক করে নিশ্চিত হতে হবে যে মানটির টাইপ সঠিক। এটি type-safety বজায় রাখে।

**সমর্থিত মানের উদাহরণ:**

1. Primitive: `number`, `string`, `boolean`, `bigint`, `symbol`, `null`, `undefined`
2. Object: `object`, `array`, `function`, `class instance`
3. Complex/custom: `union`, `intersection`, `tuple` ইত্যাদি

**উদাহরণ:**

```ts
let u: unknown;

u = 42;       // ঠিক আছে
u = "Hello";  // ঠিক আছে

// u.toUpperCase(); // ❌ Error, type check না হওয়া পর্যন্ত ব্যবহার নিষিদ্ধ

if (typeof u === "string") {
  console.log(u.toUpperCase()); // ✔ Safe, compiler নিশ্চিত
}
```

---

## 3. `never`

`never` টাইপ এমন একটি টাইপ যা কোনো মান ধারণ করতে পারে না। এটি সাধারণত ব্যবহৃত হয় এমন ফাংশনের জন্য যা কখনো return করে না বা সবসময় error ছুড়ে দেয়।

**ব্যবহার ক্ষেত্র:**

1. ফাংশন যা কখনো শেষ হয় না (যেমন অনন্ত লুপ)
2. ফাংশন যা সবসময় error ছুড়ে দেয়
3. টাইপ-নিরাপত্তার জন্য exceptional condition check

**উদাহরণ:**

```ts
function fail(message: string): never {
  throw new Error(message); // কখনো return হবে না
}

function infiniteLoop(): never {
  while (true) {} // কখনো শেষ হবে না
}
```
<br><br>
# 4. What is the use of `enums` in TypeScript? Provide an example of a numeric and string enum.

TypeScript-এ `enum` হলো একটি **নেমড কনস্ট্যান্ট গ্রুপ**, যা সংখ্যা বা স্ট্রিং মানের সমন্বয়ে একটি লজিকাল সেট তৈরি করে। এটি কোডকে আরও পরিষ্কার, পড়তে সহজ এবং টাইপ-সেফ বানায়।  

### প্রয়োজনীয়তা
1. **কোডে পুনরাবৃত্তি মান কমানো** – যেগুলো পূর্বনির্ধারিত মানের মধ্যে সীমাবদ্ধ।  
2. **পঠনযোগ্যতা বৃদ্ধি** – নাম দিয়ে মান বোঝা যায়।  
3. **টাইপ-সেফটি বজায় রাখা** – ভুল মান ব্যবহার করা কঠিন হয়।  

অর্থাৎ, `enum` হলো **স্ট্যাটিক মানের জন্য টাইপ-সেফ ও নামযুক্ত সমাধান**।  

---

### Numeric Enum Example

```ts
enum Direction {
  Up,       // 0
  Down,     // 1
  Left,     // 2
  Right     // 3
}

let move: Direction = Direction.Up;
console.log(move); // Output: 0
```
### String Enum Example
```ts
enum Status {
  Success = "SUCCESS",
  Failure = "FAILURE",
  Pending = "PENDING"
}

let currentStatus: Status = Status.Success;
console.log(currentStatus); // Output: "SUCCESS"
``` 
<br><br>
# 5. Provide an example of using union and intersection types in TypeScript.

### **Union Types**

Union type হলো এমন একটি টাইপ যা কোনো variable বা parameter-কে একাধিক সম্ভাব্য টাইপের মধ্যে যেকোনো একটি গ্রহণ করার অনুমতি দেয়।
* **সিনট্যাক্স:** `type1 | type2 | type3`
* **ব্যবহার:** যখন একটি value একাধিক type হতে পারে।

**উদাহরণ:**

```ts
type ID = number | string;

let userId: ID;

userId = 101;      // বৈধ
userId = "A123";   // বৈধ
// userId = true;  // ❌ অযথাযথ, boolean assign করা যাবে না
```

**বৈশিষ্ট্য:**

* TypeScript compiler নিশ্চিত করে যে value অবশ্যই নির্ধারিত type-এর মধ্যে হবে।
* Runtime error কমায় এবং type-safety নিশ্চিত করে।

---

### **Intersection Types**

Intersection type হলো এমন একটি টাইপ যা একাধিক টাইপের বৈশিষ্ট্য একসাথে ধারণ করতে সক্ষম।
* **সিনট্যাক্স:** `type1 & type2 & type3`
* **ব্যবহার:** যখন object বা variable-এ একাধিক type-এর সব প্রপার্টি থাকতে হবে।

**উদাহরণ:**

```ts
type Person = { name: string };
type Employee = { employeeId: number };

type EmployeePerson = Person & Employee;

const emp: EmployeePerson = { name: "Sabbir", employeeId: 101 };
```

**বৈশিষ্ট্য:**

* Intersection type নিশ্চিত করে যে variable-এ সব সংযোজিত type-এর প্রপার্টি উপস্থিত থাকবে।
* Code consistency এবং structured typing বজায় রাখে।

---



