const {port} = require("./utils/utils");
const startServer = require("./server")

const app = startServer.listen(port, () => {
    console.log("Server is listening on port " + port);
});

// Set the server timeout to 60 seconds (60000 milliseconds)
app.timeout = 60000;