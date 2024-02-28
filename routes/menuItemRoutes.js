const express=require('express');
const router = express.Router();
const menuItem = require('./../models/menu');


//for menu--->post method
router.post('/',async(req,res)=>{
    try{
        const data1=req.body
        const response = new menuItem(data1);
        const savedMenu = await response.save();
        console.log("Added menu to the database");
        res.status(201).json(savedMenu);}
    catch(error){
        console.log("Error saving menu",error);
        res.status(500).json({error:"Internal error in saving the menu data in the db"});
    }
});

//get method for menu
router.get('/',async(req,res)=>{
    try{
        const menu = await menuItem.find();
        res.json(menu);
    }
    catch(error){
        console.log("Error fetching person",error);
        res.status(500).json({error:"Internal error occured"});

    }

})
router.get('/:taste', async (req, res) => {
    try {
    const tasteType = req.params.taste; // Extract the work type from the URL parameter
    // Assuming you already have a Person model and MongoDB connection set up
    if(tasteType=='Spicy'||tasteType=='Sweet'||tasteType=='Sour'){
    const menu = await menuItem.find({ taste: tasteType });
    // Send the list of persons with the specified work type as a JSON response
    res.json(menu);}else{
        res.status(404).json({error:"Invalid"});
    }
    } catch (error) {
    console.error('Error fetching :', error);
    res.status(500).json({ error: 'Internal server error' });
    }
    });
module.exports=router;
