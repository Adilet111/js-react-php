import React, {Component} from 'react';
import ToDoItem from './ToDoItem';
import toDoData from "./toDosData";

class ToDo extends Component{
    constructor(){
        super()
        this.state = {
            todos:toDoData
        }
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(id){

        this.setState(prevState =>{
                return {
                    todos:prevState.todos.map((item)=>{
                    if(item.id === id){
                        item.completed = !item.completed
                    }
                    return item
                })
            }
        })
        console.log('you clicked input with ', id)
    }
    render(){
        const data = this.state.todos.map((item)=>{
            return <ToDoItem key ={item.id} item ={item} handleChange = {this.handleChange}/>
        })
        return (
            <div className="ToDoList">
                {data}
            </div>
        )
    }
    
}
export default ToDo;