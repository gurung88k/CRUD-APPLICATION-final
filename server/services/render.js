const Userdb = require("../model/model");

exports.homeRoutes = (req, res) => {
  console.log("📡 Called homeRoutes: trying to fetch users...");

  Userdb.find()
    .then(users => {
      console.log("✅ Found users:", users.length);
      res.render('index', {
        users: users,
        success: req.query.success //  pass success message
      });
    })
    .catch(err => {
      console.error("❌ Error while fetching users:", err);
      res.status(500).send({
        message: err.message || "Error retrieving users"
      });
    });
};

exports.add_user = (req, res) => {
  res.render('add_user');
};

exports.update_user = (req, res) => {
  const id = req.query.id;

  Userdb.findById(id)
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
      res.render('update_user', { user });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error retrieving user"
      });
    });
};
