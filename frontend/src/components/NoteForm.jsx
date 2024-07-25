import React, { useState } from "react";
import { NotesState } from "../context/NotesContext";
import axios from "axios";

const NoteForm = () => {
  const { notes, setNotes } = NotesState();
  const [searchTerm, setSearchTerm] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);

  const authToken = localStorage.getItem("authToken");

  const handleCreateNote = async () => {
    if (title == "") {
      alert("please add title ");
      return;
    } else if (content === "") {
      alert("please add content");
      return;
    }
    const newNote = {
      title,
      content,
      tags: tags.split(","),
      isArchived: false,
      isTrashed: false,
    };
    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/notes`,
        newNote,
        {
          headers: {
            "x-auth-token": authToken,
          },
        }
      );

      if (res.data) {
        setNotes([newNote, ...notes]);
      }
    } catch (err) {
    } finally {
      setTitle("");
      setContent("");
      setTags("");
      setLoading(false);
    }
  };

  return (
    <div id="note-creation">
      <h1>Crate Note</h1>
      <input
        type="text"
        id="note-title"
        placeholder="Title max 50 Char"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        maxLength={50}
        required
      />
      <textarea
        id="note-content"
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      ></textarea>
      <input
        type="text"
        id="note-tags"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <button
        id="create-note-btn"
        disabled={loading}
        onClick={handleCreateNote}
      >
        {loading ? "Creating....." : "Create Note"}
      </button>
    </div>
  );
};

export default NoteForm;
