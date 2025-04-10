const path = require('path');
const fullPath = path.resolve(__dirname, '../model/model.js');
console.log("🛠️ Loading model from:", fullPath);

const Userdb = require(fullPath);
console.log("✅ Type of Userdb:", typeof Userdb);
console.log("✅ Type of Userdb.find:", typeof Userdb.find);

// ✅ Create and save new user
exports.create = async (req, res) => {
  console.log("📥 Add User request received");

  if (!req.body) {
    return res.status(400).send({ message: "Content cannot be empty!" });
  }

  try {
    const user = new Userdb({
      name: req.body.name,
      email: req.body.email,
      gender: req.body.gender,
      status: req.body.status
    });

    const data = await user.save();
    console.log("✅ User created:", data);

    res.redirect('/?success=created'); // ✅ redirect with query param
  } catch (err) {
    console.error("❌ Error creating user:", err);
    res.status(500).send({
      message: err.message || "Some error occurred while creating the user"
    });
  }
};

// ✅ Retrieve and return all users / a single user
exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;

    Userdb.findById(id)
      .then(data => {
        if (!data) {
          res.status(404).send({ message: "Not found user with id " + id });
        } else {
          res.send(data);
        }
      })
      .catch(err => {
        res.status(500).send({ message: "Error retrieving user with id " + id });
      });
  } else {
    Userdb.find()
      .then(users => {
        res.send(users);
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || "Error occurred while retrieving users"
        });
      });
  }
};

// ✅ Update an existing user
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update cannot be empty" });
  }

  const id = req.params.id;
  Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({ message: `Cannot update user with id ${id}. Maybe user not found!` });
      } else {
        res.redirect('/?success=updated'); // ✅ redirect with query param
      }
    })
    .catch(err => {
      console.error("❌ Update Error:", err);
      res.status(500).send({ message: "Error updating user information" });
    });
};

// ✅ Delete a user by ID
exports.delete = (req, res) => {
  const id = req.params.id;

  Userdb.findByIdAndDelete(id)
    .then(data => {
      if (!data) {
        res.status(404).send({ message: `Cannot delete user with id ${id}. Maybe id is wrong` });
      } else {
        res.redirect('/?success=deleted'); // ✅ redirect with query param
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete user with id=" + id
      });
    });
};
