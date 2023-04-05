const axios = require ("axios")
const { Temperament } = require("../db");
const {getDogsApi} = require("../dataTotalDogs/getDogsApi")

const getAllTemp = async (req, res) => {
    try {

        const apiInfo = 
        (await axios.get("https://api.thedogapi.com/v1/breeds?api_key=live_pzIXSPWa66AzR9wONkfiSPwnSy2aKyfy82MQNexrZXZxsSHqUOFJ2jTS3XNhTuSQ")).data
            
        const temperaments = apiInfo.map(element => element.temperament).join().split(",").sort()
        // console.log(temperaments)
        await temperaments.filter((temp, ind) => temperaments.indexOf(temp) === ind) //hago un filter para eliminar los duplicados con indexOf
        .forEach(temp => {
            if (temp.trim() !== "") {//si el temp no es una cadena vacia
                Temperament.findOrCreate({where: {
                    name: temp.trim() 
                }})
            }
        });

        const dbTemperaments = await Temperament.findAll({
            order: ["name"]
        })
        // console.log(dbTemperaments)
        res.status(200).json(dbTemperaments)
    } catch (error) {
        (error.message)
    }
}


module.exports= {getAllTemp};
