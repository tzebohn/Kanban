import Columns from "./Columns";
import DeleteButton from "./DeleteButton";

function TaskCards({ content, columnId, index, deleteClicked}) {

    function handleDragStart(e) {
        //Create a data object
        const dragData = JSON.stringify({
            content: content,
            columnId: columnId,
            index: index
        });
        e.dataTransfer.setData("text/plain", dragData);
    }
    //Send delete index to column component
    const handleDelete = () => {
        deleteClicked(index);
    }

    return (
        <>
            <div 
                className="task-card"
                draggable
                onDragStart={handleDragStart}
                index={index}
            >
                {content}
                <DeleteButton onDelete={handleDelete}/>
            </div>
        </>
    );
}


export default TaskCards;