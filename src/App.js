import logo from './logo.svg';
import './App.css';
import contactsJSON from "./contacts.json";
import React, { useState } from 'react';

function App() {
  const [contacts, setContacts] = useState(contactsJSON.slice(0,5));

  const addRandomContact = () => {
    const index = Math.floor(Math.random() * contactsJSON.length);
    const newRandomContact = contactsJSON[index];
    contactsJSON.slice(index, 1);
    console.log(contactsJSON);
    setContacts([newRandomContact, ...contacts])
  };

  const sortCont = (prop) => {
    contacts.sort((a, b) => a[prop] > b[prop] ? 1:-1);
    setContacts([...contacts]);
  };

  const deleteContact = (id) => {
    setContacts(contacts.filter((contact) => contact.id !== id))
  };

  const round = (num) => {
    return Math.round((num + Number.EPSILON) * 100)/ 100;
  }

  return (
    <div className="App">
      <h1>IronContacts</h1>
      <span>
        <button onClick={addRandomContact}>Add Random Contact</button>
        <div>
        <button className="r-button" onClick={() => sortCont("popularity")}>Sort by popularity ▾</button>
        <button className="r-button" onClick={() => sortCont("name")}>Sort by name ▾</button>
        </div>
      </span>
      <table>
        <tr className="description-td">
          <td>Picture</td>
          <td>Name</td>
          <td>Popularity</td>
          <td>Won Oscar</td>
          <td>Won Emmy</td>
          <td>Actions</td>
        </tr>
          {contacts.map((contact) => {
        return (
          <tr className="title-td" key={contact.id}>
            <td className="list-i"><img src={contact.pictureUrl} alt={`photo of ${contact.name}`}/></td>
            <td className="contact-name">{contact.name}</td>
            <td>{round(contact.popularity).toFixed(2)}</td>
            <td>{contact.wonOscar ? "🏆" : ""}</td>
            <td>{contact.wonEmmy ? "🏆" : ""}</td>
            <td><button onClick={() => deleteContact(contact.id)}>Delete</button></td>
          </tr>
        )
        })}
      </table>
    </div>
  );
}
export default App;
