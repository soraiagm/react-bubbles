import React, { useState } from "react";
import { axiosWithAuth } from "../utilities/axiosWithAuth";

const initialColor = {
  color: "",
  code: { 
    hex: "" },
  id: '',
};

const ColorList = ({ colors, updateColors }) => {
  console.log("colors", colors);
  
  const [editing, setEditing] = useState(false);
  console.log("editing", editing)
  
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  console.log("color to edit", colorToEdit);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  ////////////////ADD COLOR////////////////////
  const [ newColor, setNewColor ] = useState ({
    color: "",
    code: { 
      hex: "" },
    id: '',
  })

  const handleChange = event => {
    setNewColor({...newColor, [event.target.name]: event.target.value})
  }

  const handleSubmit = event => {
    event.preventDefault();

    axiosWithAuth()
            .post("/colors", newColor)
            .then(res => {
                console.log('new color', res)
            })
            .catch(err => {
                console.log(err);
            })
            setNewColor({
                color: "",
                code: {
                  hex: ""
                }
            })
  }
/////////////////////ADD COLOR////////////////////


  const saveEdit = e => {
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
      .put(`/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        console.log(res);
        colors.map(color => {
          if (color.id === colorToEdit.id) {
            setColorToEdit({
              [e.target.name]: e.target.value
            })
          }
        })
      })
      .catch(err => console.log(err))
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`/colors/${color.id}`)
      .then(res => {
        console.log(res);
        const deletedColor = colors.filter(color => color.id !== color.id)
        updateColors(deletedColor)
      })
      .catch(err => {
        console.log(err)
      })
  };

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
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
          <form className="add" onSubmit={handleSubmit}>
            <input 
                className="color"
                placeholder="Color"
                type="text"
                name="color"
                value={newColor.color}
                onChange={handleChange}/>
            <input 
                className="hex"
                placeholder="hex #"
                type="text"
                name="hex"
                value={newColor.code.hex}
                onChange={handleChange}/> 
            <button type="submit" className="add-color" >Add A Color</button>
            </form>

    </div>
  );
};

export default ColorList;
