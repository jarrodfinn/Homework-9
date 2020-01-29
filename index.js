const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const generateHtml = require("./generateHTML");
const pdf = require("html-pdf");
const questions = [
  {
    type: "prompt",
    name: "githubname",
    message: "Enter your GitHub username:"
  },
  {
    type: "list",
    name: "color",
    message: "What is your favorie color?",
    choices: ["green", "blue", "pink", "red"]
  }
];
function init() {
  inquirer.prompt(questions).then(({ githubname, color }) => {
    const queryUrl = `https://api.github.com/users/${githubname}`;
    axios
      .get(queryUrl)
      .then(function(res) {
        return generateHtml({ color, ...res.data });
      })
      .then(html => {
        pdf.create(html).toStream(function(err, stream) {
          stream.pipe(fs.createWriteStream("./githubprofile.pdf"));
        });
      });
  });
}
init();