const rotateArray=(arr,k)=>{
  if (arr.length===0) 
  return[];
  const offset=k%arr.length;
  return[...arr.slice(-offset),...arr.slice(0,arr.length-offset)];
};
console.log("Rotate [1,2,3,4,5] by 2:",rotateArray([1,2,3,4,5],2));
