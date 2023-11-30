const controller = {};
const models = require("../models");

controller.show = async (req, res) => {
  res.locals.users = await models.User.findAll({
    attributes: [
      "id",
      "imagePath",
      "username",
      "firstName",
      "lastName",
      "mobile",
      "isAdmin",
    ],
    order: [["createdAt", "DESC"]],
  });
  res.render("user-management");
};

controller.addUser = async (req, res) => {
  const { username, firstName, lastName, mobile, isAdmin } = req.body;
  try {
    await models.User.create({
      username,
      firstName,
      lastName,
      mobile,
      isAdmin: isAdmin ? true : false,
    });
    res.redirect("/users");
  } catch (err) {
    res.send("cannot add user");
    console.log(err);
  }
};

controller.editUser = async (req, res) => {
  console.log("HE");
  let { id, username, firstName, lastName, mobile, isAdmin } = req.body;
  console.log(id);
  try {
    await models.User.update(
      { firstName, lastName, mobile, isAdmin: isAdmin ? true : false },
      { where: { id: id } }
    );
    res.send("HSHS");
  } catch (err) {
    console.log(err);
  }
};

controller.deleteUser = async (req, res) => {
  let id = req.params.id;
  id = parseInt(id);
  console.log(id);
  await models.User.destroy({ where: { id } });
  res.send("HHS");
};

module.exports = controller;
