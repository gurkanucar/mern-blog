


module.exports = (app) => {

  app.get("/test", (req, res) => {
    res.json({
      "message": "test"
    })
  });


  app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    res.json({
      "message": "success"
    })
  });


}
