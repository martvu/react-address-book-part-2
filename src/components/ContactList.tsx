import { useContext } from "react";
import { AppContext } from "../App";
import ContactItem from "./ContactItem";

function ContactList() {
  const contacts = useContext(AppContext);

  return (
    <div>
      <h1>Contacts</h1>
      <ul className="contact-list">
        {contacts.map((contact, index) => (
          
          <ContactItem contact={contact} key={index}/>
        ))}
      </ul>
    </div>
  );
}

export default ContactList;
