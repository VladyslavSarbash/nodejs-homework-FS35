// Request to get contacts from the database for CRUD operation
const db = require('../../service')

const getCollectionContacts = async () => {
  const client = await db
  const database = await client.db('db_contacts')
  const contacts = await database.collection('contacts')

  return contacts
}

module.exports = getCollectionContacts
