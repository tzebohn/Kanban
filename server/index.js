const express = require('express');
const cors = require('cors');
const fs = require('fs');
const { get } = require('http');
const { publicDecrypt } = require('crypto');
const { json } = require('stream/consumers');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

//Start express server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
});

//Load the tasks
app.get('/tasks', (req, res) => {
    const data = fs.existsSync('tasks.json')
        ? fs.readFileSync('tasks.json')
        : JSON.stringify({
            todo: [],
            inProgress: [],
            complete: []
        });

    console.log("Loading tasks", data)
    res.send(JSON.parse(data));
});

//Retrieve the task data from frontend
app.post('/tasks', (req, res) => {
    const tasks = req.body;
    console.log("json file in backend:", tasks)
    fs.writeFileSync('tasks.json', JSON.stringify(tasks, null, 2));
    res.send({message: 'Tasks saved successfully'});
});

