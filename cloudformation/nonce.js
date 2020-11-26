const fs = require('fs');

const nonce = () => {
    const randomNumber = Math.floor(Math.random() * 10000).toString();
    fs.writeFile("./random.json", `{ "randomnumber": "${randomNumber}" }`, (err) => {
        if (err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
}

module.exports = { nonce };