import React, { createContext, useContext, useState } from "react";

const Notes = createContext();

export const NotesContext = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [activeTab, setActiveTab] = useState("notes");

  return (
    <Notes.Provider value={{ notes, setNotes, activeTab, setActiveTab }}>
      {children}
    </Notes.Provider>
  );
};

export const NotesState = () => {
  return useContext(Notes);
};
