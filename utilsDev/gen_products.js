const mongoose = require("mongoose");
const faker = require("faker");
const PersonModel = require("../models/PersonModel");

mongoose.connect(
  "mongodb+srv://login:senha@exemplo.com.br/exemplo?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

async function add(n) {
  try {
    for (let i = 0; i < n; i++) {
      const p = new PersonModel();
      p.name = faker.name.findName();
      p.contry = faker.address.country();
      p.mail = faker.internet.email();
      p.company = faker.company.companyName();
      await p.save();
    }
  } catch (err) {}
}

add(100).then(() => {
  mongoose.disconnect();
});
