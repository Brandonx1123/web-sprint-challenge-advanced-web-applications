import React, { useEffect, useState } from "react";
import{axiosWithAuth} from '../helpers/axiosWithAuth'
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);


const getColors= () =>{
  axiosWithAuth()
    .get('/colors')
    .then((res) => {
      console.log('this is res is in GET REQUEST',res)
      setColorList(res.data)
    })
    .catch((err) => {
      console.log('Cant get color list in GET', err)
    })
}


useEffect(() => {
  getColors()
}, [])


  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} getColors={getColors} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;

//Task List:
//1. Make an axios call to retrieve all color data and push to state on mounting.
