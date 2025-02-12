import { AppContext, BASE_URL } from "../App";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ContactInfo } from "../types";
import { useContext } from "react";

function ContactDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { contacts, setContacts, refetch } = useContext(AppContext);
  const contact: ContactInfo | undefined = id
    ? contacts.find((c) => c.id === parseInt(id))
    : undefined;

  const handleDelete = async (id: number) => {
    const prevContacts = contacts;
    try {
      const request = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
      });
      if (!request.ok) {
        throw new Error("Failed to delete new contact");
      }
      setContacts((prev) => prev.filter((c) => c.id !== id));
      refetch();
    } catch (error) {
      console.error("Error deleting contact", error);
      setContacts(prevContacts);
    }
    navigate("/");
  };

  if (!contact) {
    return <div></div>;
  }
  return (
    <div>
      <h2>
        {contact.firstName} {contact.lastName}
      </h2>
      <ul>
        <li>
          <p>Street: {contact.street}</p>
        </li>
        <li>
          <p>City: {contact.city}</p>
        </li>
        <li>
          <p>Email: {contact.email}</p>
        </li>
        <li>
          <p>Gender: {contact.gender}</p>
        </li>
        <li>
          <p style={{ color: contact.favouriteColour }}>Favourite Colour</p>
        </li>
        <li>
          <p>Job title: {contact.jobTitle}</p>
        </li>
        <li>
          <p>Latitude: {contact.latitude}</p>
        </li>
        <li>
          <p>Longitude: {contact.longitude}</p>
        </li>
        <li>
          <img src={contact.profileImage || "#"} alt="profile image" />
        </li>
      </ul>
      <div className="contact-links">
        <button onClick={() => handleDelete(contact.id)}>Delete</button>
        <Link to={`/contact/${id}/edit`}>Edit</Link>
      </div>
    </div>
  );
}

export default ContactDetails;
