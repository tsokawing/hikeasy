const express = require('express');
const app = express();
const port = 8080;

// establish root endpoint
// this is a sample on how to further extend the backend code
app.get('/', async function(req: any, res: any) {
    res.send({
        'running': true,
        'message': 'Hello World!',
    });
});

// link the different modules to the main file
// we will leave this blank for now, this is currently empty project...

// finally specify that we are starting the backend
app.listen(port, () => {
    console.log(`Backend is now started at http://localhost:${port}`)
})
