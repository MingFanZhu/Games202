const fs = require("fs");

function buildIndex() {
    if (fs.existsSync('./js/index.js')) {
        fs.rmSync('./js/index.js');
    }

    let out = "";
    let files = fs.readdirSync("./js");
    for (let file of files) {
        let className = file.split('.')[0];
        out += `export {default as ${className}} from "./${file}";\n`;
    }

    fs.writeFileSync('./js/index.js', out);
}

let htmlOut = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Demos</title>
</head>
<body>
<li>

`
function buildIndexHtml(){
    if (fs.existsSync('./index.html')) {
        fs.rmSync('./index.html');
    }

    let files = fs.readdirSync("./html");
    for (let file of files) {
        let name = file.split('.')[0];
        htmlOut += `<a href="./html/${file}">${name}</a>\n`;
    }

    htmlOut +=`
    </li>
</body>
</html>
    `;

    fs.writeFileSync('./index.html', htmlOut);
}

module.exports = {
    buildIndex,
    buildIndexHtml
}