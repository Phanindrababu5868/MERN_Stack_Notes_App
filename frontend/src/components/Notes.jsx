import React from "react";
import { NotesState } from "../context/NotesContext";
import {
  FolderDown,
  FolderUp,
  Trash2,
  FolderSync,
  FolderX,
  NotebookText,
} from "lucide-react";
import axios from "axios";

let colors = ["#ffffff", "#facccc", "#FFF8BC", "#bae1d3", "#d8fff6", "#F0DDF8"];

const tabs = [
  {
    name: "Notes",
    icon: <NotebookText />,
  },
  {
    name: "Archive",
    icon: <FolderDown />,
  },
  {
    name: "Trash",
    icon: <Trash2 />,
  },
];

const Notes = () => {
  const { notes, setNotes, activeTab, setActiveTab } = NotesState();
  let authToken = localStorage.getItem("authToken");

  const updateNote = async (note, updatedFields) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/notes/${note._id}`,
        { ...note, ...updatedFields },
        {
          headers: {
            "x-auth-token": authToken,
          },
        }
      );
      if (res.data) {
        setNotes((prevNotes) =>
          prevNotes.map((n) => (n._id === note._id ? res.data : n))
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const archiveNote = (note) => {
    updateNote(note, { isArchived: !note.isArchived, isTrashed: false });
  };

  const trashNote = (note) => {
    updateNote(note, { isTrashed: !note.isTrashed, isArchived: false });
  };

  const restoreNote = (note) => {
    updateNote(note, { isTrashed: false });
  };

  const deleteNote = async (note) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/notes/${note._id}`, {
        headers: {
          "x-auth-token": authToken,
        },
      });
      setNotes((prevNotes) => prevNotes.filter((n) => n._id !== note._id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleColorChange = (note, newColor) => {
    updateNote(note, { backgroundColor: newColor });
  };

  const filteredNotes = notes.filter((each) => {
    if (activeTab === "archive") {
      return each.isArchived;
    } else if (activeTab === "trash") {
      return each.isTrashed;
    }
    return !each.isArchived && !each.isTrashed;
  });
  console.log("activetab", activeTab, filteredNotes);
  return (
    <div className="container">
      <div className="tab-container">
        {tabs.map((each, index) => (
          <div
            key={index}
            className={`tab ${
              each.name.toLowerCase() === activeTab ? "active-tab" : ""
            }`}
            onClick={() => setActiveTab(each.name.toLowerCase())}
            style={{ fontSize: "24px", display: "flex" }}
          >
            {each.name}&nbsp; {each.icon}
          </div>
        ))}
      </div>
      <div id="notes-list">
        {filteredNotes.length === 0 ? (
          <p>Notes you add appear here </p>
        ) : (
          filteredNotes.map((note) => (
            <div
              key={note._id}
              style={{ background: `${note.backgroundColor}` }}
              className="note"
            >
              <h1 className="note-title">{note.title}</h1>
              <p className="note-content">{note.content}</p>
              <div className="note-tags">{note.tags.join(", ")}</div>
              <div className="action-container">
                <label>BgColor</label>
                <select
                  value={note.backgroundColor}
                  onChange={(e) => handleColorChange(note, e.target.value)}
                  style={{ backgroundColor: note.backgroundColor }}
                >
                  {colors.map((color, index) => (
                    <option
                      value={color}
                      key={index}
                      style={{ backgroundColor: color }}
                    >
                      {color}
                    </option>
                  ))}
                </select>
                {activeTab === "notes" && (
                  <>
                    <button
                      style={{ backgroundColor: "transparent" }}
                      title="archive"
                      onClick={() => archiveNote(note)}
                    >
                      <FolderDown color="black" />
                    </button>
                    <button
                      style={{ backgroundColor: "transparent" }}
                      title="trash"
                      onClick={() => trashNote(note)}
                    >
                      <Trash2 color="black" />
                    </button>
                  </>
                )}
                {activeTab === "archive" && (
                  <>
                    <button
                      style={{ backgroundColor: "transparent" }}
                      title="unarchive"
                      onClick={() => archiveNote(note)}
                    >
                      <FolderUp color="black" />
                    </button>
                    <button
                      style={{ backgroundColor: "transparent" }}
                      title="trash"
                      onClick={() => trashNote(note)}
                    >
                      <Trash2 color="black" />
                    </button>
                  </>
                )}
                {activeTab === "trash" && (
                  <>
                    <button
                      style={{ backgroundColor: "transparent" }}
                      title="delete"
                      onClick={() => deleteNote(note)}
                    >
                      <FolderX color="black" />
                    </button>
                    <button
                      style={{ backgroundColor: "transparent" }}
                      title="restore"
                      onClick={() => restoreNote(note)}
                    >
                      <FolderSync color="black" />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notes;
