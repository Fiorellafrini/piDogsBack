const { getDogsApi } = require("./getDogsApi");
const { getDogsDb } = require("./getDogsDb");

//Junto todos los datos
const getApiDb = async () => {
  try {
    const dataApi = await getDogsApi();
    let dataDB = await getDogsDb();
    
    dataDB = await dataDB.map((dog) => {
      return {
        id: dog.dataValues.id,
        name: dog.dataValues.name,
        heightMax: dog.dataValues.heightMax,
        heightMin: dog.dataValues.heightMin,
        weightMin: dog.dataValues.weightMin,
        weightMax: dog.dataValues.weightMax,
        life_span: dog.dataValues.life_span,
        breed_group: dog.dataValues.breed_group,
        image: dog.dataValues.image,
        origin: dog.dataValues.origin,
        bred_for: dog.dataValues.bred_for,
        temperaments: dog.dataValues.temperaments
          .map((item) => item.name)
          .join(", "),
      };
    });

    // console.log("dataaaaaaaaaaa", dataApi);
    const allDogs = dataApi.concat(dataDB);

    // const allDogs = dataDB.concat(dataApi);
    // const allDogs = [...dataDB, ...dataApi];
    //todo lo que tenga en dataDB y todo lo que tenga en dataApi

    return allDogs;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { getApiDb };
