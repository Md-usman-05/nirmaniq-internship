const fibonacci=(n)=>{
    let [a,b]=[0,1];
    for(let i=0;i<n;i++){
        [a,b]=[b,a+b];

    }
    return a;
};
console.log("Fibonacci(7):",fibonacci(5));