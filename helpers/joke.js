const axios = require("axios");

const fetchRandomJoke = async () => {
  const {
    data: { value },
  } = await axios.get("https://api.chucknorris.io/jokes/random");
  return value;
};

module.exports = fetchRandomJoke;
