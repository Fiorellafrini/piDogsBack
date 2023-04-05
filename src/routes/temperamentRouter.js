const { Router } = require('express');
const { getAllTemp } = require('../Controllers/temperamentControllers')



const temperamentRouter = Router();


// #### **📍 GET | /temperaments**
temperamentRouter.get("/", getAllTemp)




module.exports= temperamentRouter;


























// temperamentRouter.get("/", async (req, res) => {
    // res.send("todo esta bien")
//     try {
//         const allTemps = await getAllTemp();
//         res.status(200).json(allTemps)
//     } catch (error) {
//         res.status(400).json({error: error.message})
//     }
// })




 