import { Link } from "react-router-dom";
import { ContactInfo } from "../types";

function ContactItem({ contact }: { contact: ContactInfo }) {
  return (
    <>
      <li className="contact-item">
        <p>
          {contact.firstName} {contact.lastName}
        </p>
        <Link to={`/contact/${contact.id}`}>
          <p>View</p>
        </Link>
      </li>
      <hr />
    </>
  );
}

export default ContactItem;
