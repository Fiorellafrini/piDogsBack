require("dotenv").config();
const axios = require("axios");
const {YOUR_API_KEY} = process.env

//Llamo a la api, y despues me traigo lo que necesito(lo que tengo en modelos)
//Tengo un arreglo con los dogs de la api
const getDogsApi = async () => {
  try {
    const dogsApi = await axios.get(
      `https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`
    );

    const dogsApiData = dogsApi.data.map((dog) => {
      const [heightMin, heightMax] = dog.height.metric
        ? dog.height.metric.split(" - ")
        : [null, null];
      const [weightMin, weightMax] = dog.weight.metric
        ? dog.weight.metric.split(" - ")
        : [null, null];

      return {
        id: dog.id,
        name: dog.name,
        heightMin,
        heightMax,
        weightMin,
        weightMax,
        breed_group: dog.breed_group,
        life_span: dog.life_span,
        image: dog.image.url,
        bred_for: dog.bred_for,
        origin: dog.origin,
        temperaments: dog.temperament,
      };
      // console.log(dogsApiData);
    });
    return dogsApiData;
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = { getDogsApi };
