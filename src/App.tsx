import { createContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ContactInfo } from "./types";
import Layout from "./components/Layout";
import ContactList from "./components/ContactList";
import ContactForm from "./components/ContactForm";
import ContactDetails from "./components/ContactDetails";
import useFetchData from "./hooks/useFetchData";

const initialState: ContactInfo[] = []
export const AppContext = createContext<ContactInfo[]>(initialState);
export const BASE_URL = "https://boolean-uk-api-server.fly.dev/martvu/contact";
function App() {
  const { data, error, loading } = useFetchData<ContactInfo[]>(BASE_URL, []);
  

  return (
    <>
    <AppContext value={data} >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<ContactList />} />
            <Route path="/add-contact" element={<ContactForm />} />
            <Route path="/contact/:id" element={<ContactDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
      </AppContext>
    </>
  );
}

export default App;
