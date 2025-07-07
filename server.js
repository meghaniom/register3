const express = require('express');
const app = express ();
const dbConnect = require('./register/config/dbConnect')



dbConnect()
.then(()=> 
        console.log("Connected to database")
    
)
app.use(express.json());

const PORT = 3000;




 app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}
 );