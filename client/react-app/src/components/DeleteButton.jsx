import Board from "./Board";

function DeleteButton({ onDelete }) {
    
    return (
        <>
            <span 
                className="delete-btn"
                onClick={onDelete}
            >
            ❌
            </span>
        </>
    );
}

export default DeleteButton;