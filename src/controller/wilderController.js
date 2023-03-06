module.exports = {
  create: (req, res) => {
    console.log(req.body);
    res.send("Hello from wilder controller");
  },
};
