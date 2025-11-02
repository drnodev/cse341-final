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


module.exports = { list, byId }; 