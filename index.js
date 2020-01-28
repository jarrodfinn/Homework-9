// The user will be prompted for a favorite color, which will be used as the background color for cards.
// The PDF will be populated with the following:

// const questions = [
//     // what is your Github user name?
const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
inquirer
  .prompt({
    message: "Enter your GitHub username:",
    name: "username"
  })
  .prompt({
    message: "What is your favorie color?",
    // array question containing: 
    // // Green
    // // Blue
    // // Pink
    // // Red

  })
  .then(function ({ username }) {
    const queryUrl = `https://api.github.com/users/${username}/repos?per_page=100`;
    axios.get(queryUrl).then(function (res) {
      const repoNames = res.data.map(function (repo) {
        return repo.name;
      });



      const repoNamesStr = repoNames.join("\n");
      fs.writeFile("repos.txt", repoNamesStr, function (err) {
        if (err) {
          throw err;
        }
        console.log(`Saved ${repoNames.length} repos`);
      });
    });
  });
    

function writeToFile(fileName, data) {


  // Profile image
// User name
// Links to the following:

// User location via Google Maps
// User GitHub profile
// User blog


// User bio
// Number of public repositories
// Number of followers
// Number of GitHub stars
// Number of users following


}

function init() {}

init()
