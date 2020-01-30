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
        const generatedHTML = generateHtml({ color, ...res.data });
        fs.writeFile("tester.html", generatedHTML, (err => {
          if (err) console.log(err)
          pdf.create(generatedHTML, {format: "Letter"}).toStream(function(err, stream) {
            stream.pipe(fs.createWriteStream("./githubprofile.pdf"));
          });
        }))
      })
  });
}
init();