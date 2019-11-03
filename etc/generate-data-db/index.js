const fs = require('fs');
const path = require('path');
const faker = require('faker');

const generateTask = () => ({
  id: faker.random.uuid(),
  modify: Date.now(),
  title: `Meeting with ${faker.name.findName()}`,
  description: `${faker.date.weekday()}\nAddress: ${faker.address.city()} ${faker.address.streetAddress()}\nPhone: ${faker.phone.phoneNumberFormat()}`,
  priority: faker.random.arrayElement(['hight', 'normal', 'low']),
  status: faker.random.number(3) < 3 ? 'open' : 'done'
});

const runNTimes = (count = 1) => funcToRun => {
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(funcToRun());
  }
  return result;
};

const tasks = runNTimes(20)(generateTask);

fs.writeFileSync(path.join(__dirname, '../db.json'), JSON.stringify(tasks));
