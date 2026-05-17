                          // Assignment 1-Hussein Hassan
//1.                          
let stringNumber = "123";
let convertStringToNumber = Number(stringNumber);
let addedNumber = convertStringToNumber + 7;
console.log(addedNumber);
//*******************************************************

//2.
let value=false;            // edit
if(!value){
    console.log("Invalid");
}

//*******************************************************

//3.
for(let i=1; i<=10; i++){
    if(i%2==1){
        console.log(i);
    }
}

//*******************************************************

//4.
let numbers=[1,2,3,4,5];
for(let i=0; i<numbers.length; i++){
   if(numbers[i]%2==0){
    console.log(numbers[i]);
}
}

//*******************************************************

//5.
let arr1 = [1, 2, 3];                         // edit
let arr2 = [4, 5, 6];
let mergedTwoArray = [...arr1, ...arr2];
console.log(mergedTwoArray);
//*******************************************************

//6.
let day = 2;
switch(day){
    case 1:
        console.log("saturday");
        break;
    case 2:
        console.log("sunday");
        break;
    case 3:
        console.log("monday");
        break;
    case 4:
        console.log("tuesday");
        break;          
    case 5:     
        console.log("wednesday");
        break;  
    case 6:
        console.log("thursday");
        break;
    case 7:
        console.log("friday");
        break;
}

//*******************************************************

//7.
let arrayABC=["aaaa", "ab", "abc"];
for(let i=0; i<arrayABC.length; i++){
    console.log(arrayABC[i].length);
}

//*******************************************************

//8.
function checker(num){
    if(num%3==0 && num%5==0){
        console.log("Divisible by both");
    }else{
        console.log("Not divisible by both");
    }
}

// checker(15);

//*******************************************************

//9.
function powerNumber(num){
    let result = num ** 2;
    return result;
}

// console.log(powerNumber(5));

//*******************************************************

//10.
function describePerson({ name, age }) {         // edit
    return `${name} is ${age} years old`;
}

console.log(describePerson({ name: "Hussein", age: 25 }));
//*******************************************************

//11.
function sumNumbers(...numbers){
   let sum = 0;
   for(let i=0; i<numbers.length; i++){
    sum += numbers[i];
   }
   return sum;
}
console.log(sumNumbers(1,2,3,4,5,6,7,8,9,10));

//*******************************************************

//12.
function printAfterDelay(message, delay){
    setTimeout(function(){
        console.log(message);
    }, delay)
};

printAfterDelay("Success", 3);

//*******************************************************

//13.
let number = [1,7,6,3,5];
function getBigNumber(number){
    let bigNumber = number[0];
    for(let i=0; i<number.length; i++){
        if(number[i]>bigNumber){
            bigNumber = number[i];
        }
    
    }
    return bigNumber;
}
console.log(getBigNumber(number));

//*******************************************************

//14.
function objectToArray(obj) {      // I searched for it and figured it out. I hadn’t known about it before. 
    return Object.values(obj);
}

console.log(objectToArray({ a: 1, b: 2, c: 3 }));

//*******************************************************

//15.
function splitWords(wordes) {    // I searched for it and figured it out. I hadn’t known about it before.
    return wordes.split(" ");
}

console.log(splitWords("The quick brown fox"));

//*******************************************************

//Finished

// function calcPrice(price, sericeCharge) {
//     let totalPrice = price + sericeCharge;
//     return totalPrice;
// }

// console.log(calcPrice(100, 20));


// const getSum = (a, b) => {
//   let sum = a + b;
//   return sum;
// };

// console.log(getSum(5, 10));

// function loginUser(username, onSuccess) {
//   console.log(username + " logged in");
//   onSuccess();
// }

// loginUser("driver_1", () => {
//   console.log("Redirect to dashboard");
// });

const orders = [
  { id: 1, customer: "Ahmed", status: "completed", amount: 50 },
  { id: 2, customer: "Ali", status: "cancelled", amount: 30 },
  { id: 3, customer: "Sara", status: "completed", amount: 80 },
  { id: 4, customer: "Omar", status: "pending", amount: 40 }
];

const completedOrders = orders.filter(order => order.status === "completed");

console.log(completedOrders);

//--------------------------------------------------------------

const bigOrder = orders.find(order => order.amount > 60);

console.log(bigOrder);

//--------------------------------------------------------------

const customerNames = orders.map(order => order.customer);

console.log(customerNames);

//--------------------------------------------------------------
const totalCompletedAmount = orders
  .filter(order => order.status === "completed")
  .map(order => order.amount)
  .reduce((total, amount) => total + amount, 0);

console.log(totalCompletedAmount); 


