
function createCounter(firstValue) {
    let counter = firstValue;
    return {
        increment() {
            counter++;
            return counter;
        },
        decrement() {
            counter--;
            return counter;
        },
        reset() {
            counter = firstValue;
            return counter;
        },
    };
}

const counter = createCounter(5)
console.log(counter.increment()); 
console.log(counter.decrement()); 
console.log(counter.reset()); 


