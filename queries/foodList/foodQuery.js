const {Food} = require('../../models/food.js')

const createFood = async(FoodData) => {
    return await Food.create(FoodData)
}

const getFoodByName = async(foodName) => {
    return await Food.findOne({where: {foodName}})
}

const updateFood = async(foodId, updateData) => {
    const food = await Food.findByPk(foodId)
    if(food){
        return await food.update(updateData)
    }
    return null
}

module.exports = {
    createFood,
    getFoodByName,
    updateF
}