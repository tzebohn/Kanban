import { useState } from "react";

function AddTask({ onAdd }) {
    const [input, setInput] = useState("");

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && input.trim() !== "") {
            //Pass the input back to parent component
            onAdd(input.trim());
            setInput("");
        }
    };

    return (
        <>
            <div className="add-task">
                <input
                    type="text"
                    placeholder="+ Add"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </div>
        </>
    );
    
}

export default AddTask;