import React from "react";

import Notes from './Notes'

export const Home = (props) => {
  
  const {showAlert} = props
  console.log("entered home");
  return <div> 

<Notes showAlert={showAlert} />
  </div>;
 
};

