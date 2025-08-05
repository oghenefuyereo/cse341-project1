const mongodb = require("../data/database");
const objectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDatabase().db().collection("contacts").find().toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSingle = async (req, res) => {
  try {
    const contactId = new objectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection("contacts").findOne({ _id: contactId });
    res.setHeader("Content-Type", "application/json");
    if (!result) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,  // match your API JSON key
      birthday: req.body.birthday,
    };
    const result = await mongodb.getDatabase().db().collection("contacts").insertOne(contact);
    if (result.insertedCount > 0) {
      res.status(201).json({ message: "Contact created", id: result.insertedId });
    } else {
      res.status(500).json({ error: "Failed to create contact" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const contactId = new objectId(req.params.id);
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday,
    };
    const result = await mongodb.getDatabase().db().collection("contacts").replaceOne({ _id: contactId }, contact);
    if (result.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Contact not found or no changes made" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const contactId = new objectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection("contacts").deleteOne({ _id: contactId });
    if (result.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Contact not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createUser,
  updateUser,
  deleteUser,
};
