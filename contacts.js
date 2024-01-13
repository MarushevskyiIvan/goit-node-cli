const fs = require('fs/promises')
const { nanoid } = require('nanoid')
const path = require('path')

const contactPath = path.join(__dirname, './contacts.json')

const getContactList = async () => {
	return JSON.parse(await fs.readFile(contactPath))
}

async function listContacts() {
	try {
		const contacts = await getContactList()
		return contacts
	} catch (error) {
		console.log({ error: 'Unknown file' })
	}
}

async function getContactById(contactId) {
	try {
		const contacts = await listContacts()
		const contactById = contacts.find(contact => contact.id === contactId)
		return contactById || null
	} catch (error) {
		console.log({ error: 'User was not found' })
	}
}

async function addContact({ name, email, phone }) {
	try {
		const contacts = await getContactList()
		const newContact = { id: nanoid(), ...{ name, email, phone } }
		contacts.push(newContact)
		await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2))
		return newContact
	} catch (error) {
		console.log({ error: 'User was not add' })
	}
}

async function removeContact(contactId) {
	try {
		const contacts = await listContacts()
		const index = contacts.findIndex(contact => contact.id === contactId)

		if (index === -1) {
			return null
		}

		const [deleteContact] = contacts.splice(index, 1)
		await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2))
		return deleteContact
	} catch (error) {
		console.log({ error: 'User was not deleted' })
	}
}

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
}
