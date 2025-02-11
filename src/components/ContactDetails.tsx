import useFetchData from "../hooks/useFetchData";
import { BASE_URL } from "../App";
import { useParams } from "react-router-dom";
import { ContactInfo, emptyContactInfo } from "../types";

function ContactDetails() {
  const { id } = useParams();
  const { data: contact } = useFetchData<ContactInfo>(
    `${BASE_URL}/${id}`,
    emptyContactInfo
  );
  return (
    <div>
      <h2>
        {contact.firstName} {contact.lastName}
      </h2>
      <p>
        {contact.street} {contact.city}
      </p>
    </div>
  );
}

export default ContactDetails;
