import {faker}  from '@faker-js/faker'

function createRandomCarList() {
    return {
        name: faker.vehicle.vehicle(),
        fuelType: faker.vehicle.fuel(),
        model: faker.vehicle.model(),
        type: faker.vehicle.type(),
        image:"https://strapi-file-uploads.parkplus.io/5_BMW_M8_Coupe_284aed6741.webp", // Random transport image
        gearType: 'Manual',
        price: faker.finance.amount({ min: 4000, max: 20000 }),
        miles:faker.finance.amount({ min: 500, max: 1000 })
    };
}

const carList=faker.helpers.multiple(createRandomCarList,{
count:8
})

export default {carList}