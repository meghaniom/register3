const express = require('express');
const app = express ();
const dbConnect = require('./register/config/dbConnect')
const router = require('./register/routes/userRoute')



dbConnect()
.then(()=> 
        console.log("Connected to database")
    
)
app.use(express.json());

const PORT = 3000;


app.use('/api/v1/auth',router)


 app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}
 );