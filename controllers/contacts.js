const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');

const database = process.env.DB_NAME


const list = async (req, res, next) => {
  try {
    const db = mongodb.getDb().db(process.env.DB_NAME);
    const result = await db.collection('contacts').find().toArray();

    if (!result || result.length === 0) {
      return res.status(404).json({ message: 'No contacts found.' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};


const byId = async (req, res, next) => {
  try {
    const contactId = req.params.id;

    if (!ObjectId.isValid(contactId)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const db = mongodb.getDb().db(process.env.DB_NAME);
    const result = await db.collection('contacts').findOne({_id: new ObjectId(contactId)})

    if (!result) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};


const create = async (req, res) => {
  try {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({ message: 'All fields are required: firstName, lastName, email, favoriteColor, birthday.' });
    }

    const db = mongodb.getDb().db(process.env.DB_NAME);
    const result = await db.collection('contacts').insertOne({ firstName, lastName, email, favoriteColor, birthday });

    res.status(201).json({
      message: 'Contact created successfully.',
      contactId: result.insertedId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const update = async (req, res) => {
  try {
    const contactId = req.params.id;
    if (!ObjectId.isValid(contactId)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    if (!firstName && !lastName && !email && !favoriteColor && !birthday) {
      return res.status(400).json({ message: 'At least one field is required: firstName, lastName, email, favoriteColor, birthday.' });
    }

    const db = mongodb.getDb().db(process.env.DB_NAME);
    const toUpdate = {};
    if (firstName)      toUpdate.firstName      = firstName;
    if (lastName)      toUpdate.lastName      = lastName;
    if (favoriteColor) toUpdate.favoriteColor = favoriteColor;
    if (birthday)      toUpdate.birthday      = birthday;
    if (email)         toUpdate.email         = email;

    const result = await db
      .collection('contacts')
      .updateOne({ _id: new ObjectId(contactId) }, { $set: toUpdate });

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Contact not found.' });
    }

    res.status(200).json({ message: 'Contact updated successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const remove = async (req, res) => {
  try {
    const contactId = req.params.id;
    if (!ObjectId.isValid(contactId)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const db = mongodb.getDb().db(process.env.DB_NAME);
    const result = await db.collection('contacts').deleteOne({ _id: new ObjectId(contactId) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Contact not found.' });
    }

    res.status(200).json({ message: 'Contact deleted successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = { list, byId, create, update, remove }; 