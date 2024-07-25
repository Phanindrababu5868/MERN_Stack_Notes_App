import { useEffect } from "react";
import "./App.css";
import Header from "./components/layout/Header";
import NoteForm from "./components/NoteForm";
import Notes from "./components/Notes";
import { NotesState } from "./context/NotesContext";
import Auth from "./components/Auth";
import MoveUpButton from "./components/MoveUpButton";

function App() {
  let authToken = localStorage.getItem("authToken");
  const { setNotes } = NotesState();
  const fetchNotes = async () => {
    fetch(`${import.meta.env.VITE_API_URL}/notes`, {
      headers: {
        "x-auth-token": authToken,
      },
    })
      .then((response) => {
        if (!response.ok) {
          console.log(response);
          throw new Error("Failed to fetch notes");
        }
        return response.json();
      })
      .then((notes) => {
        console.log(notes);
        setNotes(notes);
      })
      .catch((error) => {
        console.error("Error fetching notes:", error);
        // handleUnauthorized(error);
        alert("Somting went wrong");
      });
  };
  useEffect(() => {
    if (authToken) fetchNotes();
  }, []);

  return (
    <>
      <Header />
      {authToken ? (
        <div id="app">
          <NoteForm />
          <Notes />
          <MoveUpButton />
        </div>
      ) : (
        <Auth />
      )}
    </>
  );
}

export default App;
