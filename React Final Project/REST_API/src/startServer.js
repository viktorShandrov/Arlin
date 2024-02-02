const {port} = require("./utils/utils");
const startServer = require("./server")

const app = startServer.listen(port,()=>{


    console.log("Server is listening on port " + port)
})

app.timeout = 60000;