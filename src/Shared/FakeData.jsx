import {faker}  from '@faker-js/faker'

function createRandomCarList() {
    return {
        name: faker.vehicle.vehicle(),
        fuelType: faker.vehicle.fuel(),
        model: faker.vehicle.model(),
        type: faker.vehicle.type(),
        image: faker.image.urlLoremFlickr({ category: 'transport' }), // Random transport image
        gearType: 'Manual',
        price: faker.finance.amount({ min: 4000, max: 20000 })
    };
}

const carList=faker.helpers.multiple(createRandomCarList,{
count:7
})

export default {carList}