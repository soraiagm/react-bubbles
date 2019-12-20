import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utilities/axiosWithAuth.js";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  console.log("colorList", colorList);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  useEffect(() => {
    getColors();
  }, [])

  const getColors = () => {
    axiosWithAuth().get("/colors")
        .then(res => {
            console.log(res);
            setColorList(res.data)
           })
        .catch(err => console.log(err));
}

  return (
    <>
      <h1>Hello</h1>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
