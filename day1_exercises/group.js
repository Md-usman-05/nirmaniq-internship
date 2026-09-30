const groupBy=(array,key)=>{
  return array.reduce((accumulator,currentItem)=>{
    const groupValue=currentItem[key];
    if (!accumulator[groupValue]){
      accumulator[groupValue]=[];
    }
    accumulator[groupValue].push(currentItem);
    return accumulator;
  },{}); 
};
const tasks=[
  {id:1,status:"blocked"},
  {id:2,status:"completed"},
  {id:3,status:"blocked"}
];
console.log(groupBy(tasks,"status"));