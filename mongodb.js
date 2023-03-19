const mongoose = require('mongoose')

mongoose.connect(
    "mongodb://localhost:27017/LoginTutorial"
)
.then(()=>{
    console.log('Mongodb connected')
})
.catch(()=>{
    console.log("failed to connect")
})


 