const { register, login } = require("../controllers/authController");

module.exports = (app) => {

  app.post("/register", async (req, res) => {
    register(req, res)
  });

  app.post("/login", (req, res) => {
    login(req, res)
  });

}
