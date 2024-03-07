import express from 'express';
import mongoose from 'mongoose';
import TransactionModel from './models/Transactions.js';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());
const PORT=4040;
app.get('/test/api', (request,response)=>{
    response.json({body: 'You are connected'});
});
app.post('/api/transaction',async (request, response)=>{
    try{
        //console.log(process.env.MONGODB_URL);
    const newBook = {
        name:request.body.name, 
        price:request.body.price,
        datetime:request.body.dateTime,
        description:request.body.description}
        const transaction = await TransactionModel.create(newBook);
        return response.status(200).send(transaction);    
    }
    catch(error){
        console.log(error.message);
    }
});
app.get('/api/transactions', async (request, response)=>{
    const transactions = await TransactionModel.find();
    response.json(transactions);
})
mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("Connected to mongoDB");
        app.listen(PORT,()=>{
            console.log(`App is listening to the port ${PORT}`);
        });
    })
