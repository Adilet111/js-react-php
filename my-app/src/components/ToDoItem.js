import React from 'react';

function ToDoItem(props){
    const complete = props.item.completed?'completed':'not_completed'
    const classes = `ToDoItem ${complete}`

    

    return (
        <div className={classes} >
            <span class="popuptext" id="myPopup">Popup text...</span>
            <input  onChange = {()=>props.handleChange(props.item.id)}type="checkbox" checked ={props.item.completed} ></input>
            <label > {props.item.text}</label><br />
        </div>
    )
}
export default ToDoItem