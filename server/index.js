const express = require('express');
const mongoose = require('mongoose');
const Food = require('./models/Food');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/Food',{
    useNewUrlParser:true
})

app.post('/insert',async(req,res)=>{
    const Name = req.body.Name;
    const Price = req.body.Price;
    const food1 = new Food({
        Name:Name,
        Price:Price
    })
    try{
        await food1.save();
        res.send("Data inserted successfully");
    }
    catch(e){
        console.log(e);
    }
})

app.get('/read',async(req,res)=>{
    Food.find().then((data)=>{res.send(data)})
})

app.put('/update',async(req,res)=>{
    const NewName = req.body.NewName;
    const NewPrice = req.body.NewPrice;
    const id= req.body.id;
    try{
    const updated = await Food.findById(id);
    if (!updated){
        res.status(404).send("Food not found");
    }
    updated.Name=NewName;
    updated.Price=NewPrice;
    await updated.save()
    res.send('Updated');
    }
    catch(e){
        console.log(e);
        res.status(500).send('Server error');
    }
})

app.delete('/delete/:id',async(req,res)=>{
    const id = req.params.id;
    try{
        const deletedFood = await Food.findOneAndDelete({_id:id}).exec();
        if(!deletedFood){
          return res.status(404).send("Food not found");
        }
        res.send('Deleted');
    }
    catch(e){
        console.log(e);
        res.status(500).send("Server error");
    }
})


app.listen(7500,()=>{
    console.log("Server establish at port 7500");
})