const { register, login } = require("../controllers/authController");

module.exports = (app) => {

  app.get("/test", async (req, res) => {
    res.json({
      "message": "success"
    })
  });

  app.post("/register", async (req, res) => {
    register(req, res)
  });

  app.post("/login", async (req, res) => {
    login(req, res)
  });

}
