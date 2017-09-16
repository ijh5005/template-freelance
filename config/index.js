const configValues = require("./config");

module.exports = {
  getDbConnectionString: () => {
    return "mongodb://"+configValues.uname+":"+configValues.psw+"@ds133311.mlab.com:33311/nodetodosample5005"
  }
}
