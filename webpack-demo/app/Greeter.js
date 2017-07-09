
// 在webpack打包的时候，可以在js文件中混用require和export。但是不能混用import 以及module.exports
// 一定要配对使用require和module.exports以及import和export default

// import config from './config.json'
// import styles from './Greeter.css'
require('./Greeter.css');
var config = require('./config.json');


module.exports = function () {
    var greet = document.createElement('div');
    greet.textContent = config.greetText;
    return greet;
}
// export default function greet () {
//     var greet = document.createElement('div');
//     greet.textContent = config.greetText;
//     return greet;
// }

