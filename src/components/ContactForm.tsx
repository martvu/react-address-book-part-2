import { useForm } from "react-hook-form";
import { ContactInfo } from "../types";
import { BASE_URL } from "../App";
import useFetchData from "../hooks/useFetchData";
import { useNavigate } from "react-router";

function ContactForm() {
  const { register, handleSubmit } = useForm<ContactInfo>();
  const { refetch } = useFetchData(BASE_URL, []);
  const navigate = useNavigate();

  const handleRegistration = async (data: ContactInfo) => {
    const request = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log(data);
    navigate("/")
    const response = await request.json();
    console.log("response", response)
    await refetch();
  };
  return (
    <form
      onSubmit={handleSubmit(handleRegistration)}
      className="form-container"
    >
      <h1>Create Contact</h1>
      <div className="form-input">
        <label>First Name</label>
        <input {...register("firstName")} />
      </div>
      <div className="form-input">
        <label>Last Name</label>
        <input {...register("lastName")} />
      </div>
      <div className="form-input">
        <label>Street</label>
        <input {...register("street")} />
      </div>
      <div className="form-input">
        <label>City</label>
        <input {...register("city")} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default ContactForm;
