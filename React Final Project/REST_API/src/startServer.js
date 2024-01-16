const {port} = require("./utils/utils");
const startServer = require("./server")

startServer.listen(port,()=>{


    console.log("Server is listening on port " + port)
})