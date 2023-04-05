const { Router } = require('express');
const dogRouter = Router();
const { searchDogsInApiAndDB, searchByName, createDog } = require('../Controllers/dogControllers');
const { getApiDb} = require('../dataTotalDogs/getApiDb');
// const { getDogsApi } = require('../dataTotalDogs/getDogsApi');
const { Dog  } = require("../db");


// #### **📍 GET | /dogs**
dogRouter.get('/getAll', async (req,res) => {
  try {
     const allDogs = await searchDogsInApiAndDB();
      res.status(200).send(allDogs);   
    } 
  catch (error) {
      res.status(404).json({error: error.message})
    }
});


// #### **📍 GET | /dogs/:id**
  // El ultimo id es el 264,  pero no estan todos, se saltea algunos numeros( por ejemplo el 99 y 100)
dogRouter.get('/:id', async (req,res) =>{
  const {id} = req.params

  const allBreeds = await getApiDb()
  const filterdId = allBreeds.filter(element =>element.id == id);
  filterdId.length > 0
  ? res.status(200).send(filterdId)
  : res.status(404).send(`Dog not found`);
console.log(allBreeds);


})


// #### **📍 GET | /dogs/name?="..."**
  dogRouter.get("/", async (req, res) => {
    try {
      const { name } = req.query;
      const dog = await searchByName(name);
      res.status(200).json(dog);
    } catch (error) {
      res.status(400).send(error.message);
    }
  });



// #### **📍 POST | /dogs**
dogRouter.post("/", async (req, res) => {
  //los datos que recibo por body son los modelos 
  const { 
      name, 
      heightMin, 
      heightMax, 
      weightMin,
      weightMax, 
      life_span, 
      breed_group, 
      bred_for, 
      image, 
      origin, 
      temperaments }
       = req.body;
  
  try {
        const newDog = await createDog(
          name, 
          heightMin, 
          heightMax, 
          weightMin,
          weightMax, 
          life_span, 
          breed_group, 
          bred_for, 
          image, 
          origin, 
          temperaments ); 

      res.status(200).json(newDog);
  } 
  catch (error) {
      res.status(400).send(error.message)
  }
});


//RUTA EXTRA DELETE ID

dogRouter.delete('/delete/:id', async (req,res) =>{
  try {
    const { id } = req.params;
    const dogDelete = await Dog.findByPk(id);
    dogDelete.destroy()
    res.status(200).send(dogDelete)
  } catch (error) {
    res.status(400).send(error.message);
  }
})


module.exports = dogRouter;