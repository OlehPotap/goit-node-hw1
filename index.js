// console.log('npm works');
// console.log('nodemon works');

 const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");



const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторить
function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
        listContacts()
        .then(data=>{console.table(JSON.parse(data))})
        .catch(error=>console.error(error))
      break;

    case "get":
        getContactById(id).then(data=>{console.table(data)})
      break;

    case "add":
        addContact(name, email, phone)
      break;

    case "remove":
        removeContact(id)
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
