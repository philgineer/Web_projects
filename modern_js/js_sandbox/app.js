const person = {
  firstName: "Steve",
  lastName: "Smith",
  age: 30,
  email: "sdfsdfdsf",
  hobbies: ["music", "sports"],
  address: {
    city: "Miami",
    state: "FL",
  },
  getBirthYear: function () {
    return 2020 - this.age;
  },
};

let val;

val = person.getBirthYear();
console.log(val);
