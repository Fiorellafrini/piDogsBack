const { Dog, Temperament } = require("../db");

//Tengo un arreglo con los dog de db
const getDogsDb = async () => {
  try {
    return await Dog.findAll({ //el metodo trae todo y me devuelve una promesa
      include: Temperament,
      //     [{
      //         model: Temperament,
      //         attributes: ["name"],
      //         // through: {
      //         //     attributes: []
      //         // }
      //     }]
    });
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = { getDogsDb };

//en la ruta getAll si pido lo de la db primerop me sale un array vacio pq no cree nada, recien se empieza a cargar haciendo el psot
