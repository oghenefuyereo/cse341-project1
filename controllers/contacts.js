const { response } = require("express");
const mongodb = require("../data/database");
const objectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['Users']
  const result = await mongodb.getDatabase().db().collection("contacts").find();
  result.toArray().then((contacts) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(contacts);
  });
};

const getSingle = async (req, res) => {
  //#swagger.tags=['Users']
  const contactId = new objectId(req.params.id);
  const result = await mongodb
    .getDatabase()
    .db()
    .collection("contacts")
    .find({ _id: contactId });
  result.toArray().then((contacts) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(contacts[0]);
  });
};

const createUser = async (req, res) => {
  //#swagger.tags=['Users']
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favouriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  };
  const result = await mongodb
    .getDatabase()
    .db()
    .collection("contacts")
    .insertOne(contact);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response || "Some error occurred while creating the contact.");
  }
};

const updateUser = async (req, res) => {
  //#swagger.tags=['Users']
  const contactId = new objectId(req.params.id);
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favouriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  };
  const result = await mongodb
    .getDatabase()
    .db()
    .collection("contacts")
    .replaceOne({ _id: contactId }, contact);
  if (response.acknowledged > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response || "Some error occurred while creating the contact.");
  }
};

const deleteUser = async (req, res) => {
  //#swagger.tags=['Users']
  const contactId = new objectId(req.params.id);
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favouriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  };
  const result = await mongodb
    .getDatabase()
    .db()
    .collection("contacts")
    .remove({ _id: contactId }, true);
  if (response.delectedcount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response || 'Some error occurred while creating the contact.');
  };
};
module.exports = {
  getAll,
  getSingle,
  createUser,
  updateUser,
  deleteUser,
};
