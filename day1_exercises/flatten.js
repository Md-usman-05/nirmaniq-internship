const flattenArray=(arr)=>{
  return arr.reduce((accumulator,currentItem)=>{
    if (Array.isArray(currentItem)){
      return accumulator.concat(flattenArray(currentItem));
    } else {
      return accumulator.concat(currentItem);
    }
  },[]);
};
console.log(flattenArray([1,[2,[3,4]],5]));