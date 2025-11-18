const formatValue = (input: string | number | boolean):string | number | boolean=>{
    if(typeof input === 'string')return input.toLocaleUpperCase();
    if(typeof input === 'number') return input*10;
    if(typeof input === "boolean") return !input;
    return 'Invalid input!'
}




const getLength = (input: string | any[]): number =>{
    if(typeof input === "string")return input.length;
    if( Array.isArray(input))return input.length;
    return -1;
}



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




const getUniqueValues = (arr1:(string | number)[], arr2:(string | number)[]): (string | number)[]=>{
    const mergeArr: (number | string)[] = [];
    for(let i = 0; i<(arr1.length+arr2.length); i++){
        if(i<arr1.length){
            mergeArr[mergeArr.length]= arr1[i]
        }
        else{
            mergeArr[mergeArr.length]=arr2[i-arr1.length]
        }
    }
    const uniqueArr: (string|number)[] = [];
    const isNotPresent = (item: string | number): boolean=>{
        for(let i = 0; i<uniqueArr.length; i++){
            if(uniqueArr[i]=== item)return false
        }
        return true;
    }
    for(let i = 0; i<mergeArr.length; i++){
        if(isNotPresent(mergeArr[i])){
            uniqueArr[uniqueArr.length] = mergeArr[i];
        }
    }
    return uniqueArr;
}




type product ={
    name:string;
    price: number;
    quantity: number;
    discount?: number;
}
const calculateTotalPrice = (input:product[]):number=>{
    const totalPrice = input.reduce((total, singleProduct)=>{
        const {discount, price,quantity}=singleProduct
        return total+(price * quantity*(1-(discount||0)/100))
    },0);
    return totalPrice;
}

