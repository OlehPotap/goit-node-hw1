const fs = require("fs").promises;
const path = require("node:path");
const contactsPath = path.resolve("./db/contacts.json");

// // TODO: задокументировать каждую функцию
async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    return JSON.parse(data).find((el) => {
      return Number(el.id) === Number(contactId);
    });
  } catch (error) {
    console.error(error);
  }
}

async function removeContact(contactId) {
    try {
        const contactsArr = JSON.parse(await fs.readFile(contactsPath, "utf8"));
       const newContactsArr = contactsArr.filter(el=>{return String(el.id) !== String(contactId)});
       await fs.writeFile(contactsPath, JSON.stringify(newContactsArr));
    } catch (error) {
        console.error(error);
    }
}

async function addContact(name, email, phone) {
  try {
    const contactsArr = JSON.parse(await fs.readFile(contactsPath, "utf8"));
    const lastContactId = contactsArr.slice(-1).find((el) => {
      return el;
    }).id;
    const newContact = {
      id: JSON.stringify(Number(lastContactId) + 1),
      name: name,
      email: email,
      phone: phone,
    };
    const newContactsArr = JSON.stringify([...contactsArr, newContact]);
    // console.log(newContactsArr)
    if (
      contactsArr.some(
        (el) => el.email === newContact.email || el.phone === newContact.phone
      )
    ) {
      console.log("контакт с таким имейлом или номером телефона уже существует");
    } else {
        await fs.writeFile(contactsPath, newContactsArr);
        console.log(`контакт записан, ему присвоен id - ${newContact.id}`);
    }
    
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
