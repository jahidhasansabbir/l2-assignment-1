const formatValue = (input: string | number | boolean):string | number | boolean=>{
    if(typeof input === 'string')return input.toLocaleUpperCase();
    if(typeof input === 'number') return input*10;
    if(typeof input === "boolean") return !input;
    return 'Invalid input!'
}
// console.log(formatValue('hello'));
// console.log(formatValue(5));
// console.log(formatValue(true));


const getLength = (input: string | any[]): number =>{
    if(typeof input === "string")return input.length;
    if( Array.isArray(input))return input.length;
    return -1;
}
// console.log(getLength('typescript'));
// console.log(getLength([10, 20, 30, 40]));

class Person{
    name:string;
    age: number;
    constructor(name: string, age: number){
        this.name = name;
        this.age = age;
    }
    getDetails():string{
        return `'Name: ${this.name}, Age: ${this.age}'`
    }
}

// const person1 = new Person('John Doe', 30);
// console.log(person1.getDetails());

// const person2 = new Person('Alice', 25);
// console.log(person2.getDetails());

type Item = {
    title:string;
    rating: number;
}
const filterByRating = (input: Item[]): Item[]=>{
    let filteredArray:Item[] = [];
    input.forEach(element =>{
        if(element.rating>=4)filteredArray.push(element)
    })
    return filteredArray
}
// const books = [
//   { title: 'Book A', rating: 4.5 },
//   { title: 'Book B', rating: 3.2 },
//   { title: 'Book C', rating: 5.0 },
// ];

// console.log(filterByRating(books));

type users = {
    id: number;
    name:string;
    email:string;
    isActive: boolean;
}
const filterActiveUsers = (input : users[]): users[]=>{
    const filteredUsers: users[] = [];
    input.forEach(element=>{
        if(element.isActive)filteredUsers.push(element)
    })
    return filteredUsers;
}

// const users = [
//   { id: 1, name: 'Rakib', email: 'rakib@example.com', isActive: true },
//   { id: 2, name: 'Asha', email: 'asha@example.com', isActive: false },
//   { id: 3, name: 'Rumi', email: 'rumi@example.com', isActive: true },
// ];

// console.log(filterActiveUsers(users));

interface Book{
    title:string,
    author: string,
    publishedYear: number,
    isAvailable: boolean
}

const printBookDetails=(input: Book)=>{
    const {title,author, publishedYear, isAvailable }= input;
    console.log(`Title: ${title}, Author: ${author }, Published: ${publishedYear}, Available: ${isAvailable? 'Yes': 'No'}`)
}
// const myBook: Book = {
//   title: 'The Great Gatsby',
//   author: 'F. Scott Fitzgerald',
//   publishedYear: 1925,
//   isAvailable: true,
// };

// printBookDetails(myBook);