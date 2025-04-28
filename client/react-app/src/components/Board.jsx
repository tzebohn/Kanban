import Columns from "./Columns";
import { useState, useEffect, use } from "react";
import axios from 'axios';


function Board() {

    const [tasks, updateTasks] = useState({
        todo: [],
        inProgress: [],
        complete: []
    });

    const [hasLoaded, setHasLoaded] = useState(false);

    const backend = axios.create({
        baseURL: 'http://localhost:3000'
    });

    //Gets called twice at the start of program. Fetches tasks from server
    useEffect(() => {
        async function loadTasks(){
            try {
                console.log('Fetching data from backend server')
                const response = await backend.get('/tasks');
                const data = response.data;
                console.log('Loaded tasks:', data)
                updateTasks(data);
                setHasLoaded(true);
            }
            catch (err) {
                console.log('Error loading tasks:', err)
            }            
        }
        loadTasks();
    }, []);

    //Gets called whenever task list changes. Saves tasks to backend.
    useEffect(() => {
        //Prevent POST immediately after loading
        if(!hasLoaded) return;

        async function saveTasks(){
            try {
                await backend.post('/tasks', tasks)
            }
            catch (err) {
                console.log('Error saving task:', err)
            }
        }

        saveTasks();
    }, [tasks, hasLoaded]);

    function handleAddTask(columnId, newTask){
        updateTasks((prevState) => (
            {
                ...prevState, //Copy the previous state object
                [columnId]: [...prevState[columnId], newTask]
            }
        ));
    
    }


    function handleDragTask(data, columnId) {
        const taskText = data.content;
        const removeFromColumn = data.columnId;
        const removeIndex = data.index;
        
        if (removeFromColumn === columnId) return;

        updateTasks((prevState) => {
            const sourceTask = [...prevState[removeFromColumn]]
            sourceTask.splice(removeIndex, 1);

            return {
                ...prevState,
                [removeFromColumn]: sourceTask,
                [columnId]: [...prevState[columnId], taskText]
            };
        });
    }

    function handleDeleteTask(columnId, index) {
        updateTasks((prevState) => {
            const newList = [...prevState[columnId]]
            newList.splice(index, 1);

            return {
                ...prevState,
                [columnId]: newList
            };
        });
    }


    return (
        <>
            <div className="board-container">
                <Columns 
                    title="To Do" 
                    columnId="todo"
                    tasks={tasks.todo}
                    onAddTask={handleAddTask}
                    onDragTask={handleDragTask}
                    onDeleteTask={handleDeleteTask}
                />
                <Columns 
                    title="In Progress" 
                    columnId="inProgress"
                    tasks={tasks.inProgress}
                    onAddTask={handleAddTask}
                    onDragTask={handleDragTask}
                    onDeleteTask={handleDeleteTask}
                />
                <Columns 
                    title="Complete" 
                    columnId="complete"
                    tasks={tasks.complete}
                    onAddTask={handleAddTask}
                    onDragTask={handleDragTask}
                    onDeleteTask={handleDeleteTask}
                />
            </div>
        </>
    );
}

export default Board;