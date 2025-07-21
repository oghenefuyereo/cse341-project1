const mongodb = require("../data/database");
const objectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  try {
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("contacts")
      .find();
    const contacts = await result.toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch contacts", error });
  }
};

const getSingle = async (req, res) => {
  try {
    const contactId = objectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("contacts")
      .findOne({ _id: contactId });
    if (!result) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch contact", error });
  }
};

const createUser = async (req, res) => {
  try {
    const contactData = req.body;
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("contacts")
      .insertOne(contactData);
    res.status(201).json({ message: "Contact created", id: result.insertedId });
  } catch (error) {
    res.status(500).json({ message: "Failed to create contact", error });
  }
};

const updateUser = async (req, res) => {
  try {
    const contactId = objectId(req.params.id);
    const updateData = req.body;
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("contacts")
      .updateOne({ _id: contactId }, { $set: updateData });
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: "Failed to update contact", error });
  }
};

const deleteUser = async (req, res) => {
  try {
    const contactId = objectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("contacts")
      .deleteOne({ _id: contactId });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete contact", error });
  }
};

module.exports = {
  getAll,
  getSingle,
  createUser,
  updateUser,
  deleteUser,
};
