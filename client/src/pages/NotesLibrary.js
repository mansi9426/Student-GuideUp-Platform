import { useEffect, useState } from "react";
import axios from "axios";

function NotesLibrary() {

  const [notes, setNotes] =
    useState([]);

  const [category, setCategory] =
  useState("All");

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes =
    async () => {

      try {

        const res =
          await axios.get(
            "http://localhost:5000/api/notes"
          );

        setNotes(
          res.data
        );

      } catch (error) {

        console.log(error);

      }
    };

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <div className="text-center mb-10">

  <h1 className="text-5xl font-bold">
    Resource Library
  </h1>

  <p className="text-gray-500 mt-3">
    Access study materials, interview notes, resume templates and learning resources.
  </p>

</div>
      <div className="flex justify-center mb-8">

  <select
    value={category}
    onChange={(e) =>
      setCategory(
        e.target.value
      )
    }
    className="border border-gray-300 rounded-xl px-4 py-3 w-72"
  >

    <option value="All">
      All Resources
    </option>

    <option value="Study Material">
      Study Material
    </option>

    <option value="Interview Notes">
      Interview Notes
    </option>

    <option value="Resume Template">
      Resume Template
    </option>

    <option value="Internship Resource">
      Internship Resource
    </option>

    <option value="Project Document">
      Project Document
    </option>

  </select>

</div>
      <div className="grid md:grid-cols-3 gap-6">

        {notes
  .filter((note) =>
    category === "All"
      ? true
      : note.category === category
  )
  .map((note) => (

          <div
            key={note._id}
            className="bg-white p-6 rounded-2xl shadow-lg"
          >

            <h2 className="text-2xl font-bold mb-3">
              {note.title}
            </h2>

            <p>
              <b>Category:</b> {note.category}
            </p>

            <p>
              <b>Mentor:</b>{" "}
              {note.mentorId?.name}
            </p>

            <a
              href={`http://localhost:5000${note.fileUrl}`}
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-4 bg-black text-white px-4 py-2 rounded"
            >
              Download PDF
            </a>

          </div>

        ))}

      </div>

    </div>
  );
}

export default NotesLibrary;