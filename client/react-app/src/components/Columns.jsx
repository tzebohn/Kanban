import { useState, useEffect } from "react";
import TaskCards from "./TaskCards";
import AddTask from "./AddTask";
import Board from "./Board";


function Columns({ title, columnId, tasks, onAddTask, onDragTask, onDeleteTask }) {
    
    const callBoardAdd = (taskText) => {
        onAddTask(columnId, taskText);
    };


    function handleDragOver(e) {
        e.preventDefault();
    }

    function handleDrop(e) {
        //Get the data object from where it was dragged from
        const data = JSON.parse(e.dataTransfer.getData("text/plain"));

        //console.log(data)
        //console.log("Current column: ", columnId)
        onDragTask(data, columnId);
    }

    //Send delete data information to board component
    const handleDelete = (index) => {
        onDeleteTask(columnId, index);
    }

    return (
        <>  
            <div className="columns" id={columnId} onDrop={handleDrop} onDragOver={handleDragOver}>
                <h2>{title}</h2>
                <div className="task-list">
                    {tasks.map((task, index) => (
                        <TaskCards 
                            key={index} 
                            content={task} 
                            columnId={columnId} 
                            index={index}
                            deleteClicked={handleDelete}
                        />
                    ))}
                </div>

                <AddTask onAdd={callBoardAdd}/> 
            </div>
        </>
    );
}

export default Columns;