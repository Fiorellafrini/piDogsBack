// const { default: axios } = require("axios");
const { getApiDb } = require("../dataTotalDogs/getApiDb");
const { Dog } = require("../db");
const specialCharactresTypeRegex = /[0-9@:%._+~#=]/gi;

// <=============== controller getallDogs ===============>
async function searchDogsInApiAndDB() {
  // Guardamos los datos de la API Y DB en data.
  let data = await getApiDb();
  //Si la funcion no recibe nada, devuelve un error.
  if (!Dog) throw new Error("No se encuentran datos");
  return data;
}

// <=============== controller searchByName ===============>

async function searchByName(name) {
  //Validamos los datos ingresados en la busqueda
  if (!name) throw new Error("Debe ingresar el nombre de la raza a buscar");

  if (specialCharactresTypeRegex.test(name)) {
    throw new Error("Debes ingresar un nombre valido");
  }
  // Guardamos los datos de la API/DB en data
  const data = await getApiDb();
  if (!data) throw new Error("No hay info");

  //Transformo todo a minuscula
  let findDog = data.filter((dog) =>
    dog.name.toLowerCase().includes(name.toLowerCase())
  );

  if (!findDog.length) throw new Error("No se pudo encontrar");

  return findDog;
}

// <=============== controller createDog ===============>

// Creamos un dog y la guardamos en la base de datos

const createDog = async (
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
  temperaments
) => {
  //Validacion los datos
  if (!name || !heightMin || !heightMax || !weightMin || !weightMax) {
    throw new Error("Mandatory data is missing");
  }
  if (!Array.isArray(temperaments)) {
    throw new Error("Temperaments should be an array");
  }
let findName = await Dog.findOne({ where: { name: name } });
  if (findName) {
    throw new Error("The name is used");
  }
  
  //Agrego el newDog a mi base de datos, con un llamado asyn
  const newDog = await Dog.create({
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
    temperaments,
    // isFromDB: true,
  });

  //Relaciona el newDog con los temperaments creados en la bd.
  await newDog.addTemperaments(temperaments);

  //los metodos se guardan en el prototipo, consologue lo de abajo, paso el insomnia y me consologuea los metodos.
  //Los metodos los crea  sequalize cuando se crea la relacion n:n.
  //(set:setea, has:preguntar si tiene, add:agregar, count:contar, remove:removar, get:obtener)

  //  console.log("MODELO", Dog.__proto__);
  //  console.log("ENTIDAD", newDog.__proto__);

  return newDog;
};


module.exports = { searchDogsInApiAndDB, searchByName, createDog };







//------------------/delete/:id------------------------

// const deleteDog = async (id) => {

//   const result = Dog.findAll({
//       where: {
//         id: {
//           [Op.eq]: id,
//         },
//       },
//     });
//     await Dog.destroy({
//       where: {
//         id: id,
//       },
//     });

//     return result;
//   };


// <=============== controller getId ===============>

// const getId = async(id) => {
//   const allBreeds = await getApiDb();
//   // if(!data) throw Error ('No hay data')
//   const filtredBreed = allBreeds.filter(e =>e.id == id);
// if(filtredBreed.length < 0) throw Error ('No hay dogs con ese id')
// return filtredBreed
// }




