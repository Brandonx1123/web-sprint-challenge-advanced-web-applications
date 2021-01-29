import React, { useState } from "react";
import EditMenu from './EditMenu'
import { axiosWithAuth } from "../helpers/axiosWithAuth";



const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors, getColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
    .put(`/colors/${colorToEdit.id}`, colorToEdit)
    .then((res) =>{
      console.log('Save from ColorList:',res)
      updateColors(
        colors.map(color => {
      if (color.id === res.data.id) {
            return res.data
          } else{
            return color
          }
        })
    )
    setEditing(false)
      })
    .catch((err) =>{
      console.log(err)
    })
    };

    const deleteColor = colorToEdit => {
      axiosWithAuth()
      .delete(`/colors/${colorToEdit.id}`)
      .then((res) => {
        console.log('res when DELETING:',res)
        getColors()
      })
      .catch((err) =>{
        console.log('Error when deleting',err)
      })
    } 

  // const deleteColor = color => {
  //   axiosWithAuth()
  //   .delete(`/colors/${color.id}`)
  //   .then((res) =>{
  //       console.log('RES WHEN HIT DELETE:', res)
  //       setEditing(false)
  //       updateColors(colors.filter((item) =>{
  //         return item !== color.id
  //       }))
  //   })
  //   .catch((err) =>{
  //     console.log('OOPS CANT DELETE:',err.message)
  //   })
  // };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      { editing && <EditMenu colorToEdit={colorToEdit} saveEdit={saveEdit} setColorToEdit={setColorToEdit} setEditing={setEditing}/> }

    </div>
  );
};

export default ColorList;

//Task List:
//1. Complete the saveEdit functions by making a put request for saving colors. (Think about where will you get the id from...)
//2. Complete the deleteColor functions by making a delete request for deleting colors.