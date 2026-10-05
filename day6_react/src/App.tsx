import React from'react';
import{TaskList}from'./TaskList';
import{ProgressBar}from'./ProgressBar';
import{FloorGrid}from'./FloorGrid';
export default function App(){
  return(
    <div style={{padding:'20px'}}>
      <h2>Exercise 1</h2>
      <TaskList/>
      <h2>Exercise 2</h2>
      <ProgressBar pct={75} risk="at-risk"/>
      <h2>Exercise 3</h2>
      <FloorGrid/>
    </div>
  );
}