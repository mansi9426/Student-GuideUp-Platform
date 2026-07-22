import { useState } from "react";
import axios from "axios";

function UploadNote() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [title, setTitle] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [pdf, setPdf] =
    useState(null);

  const submitHandler =
    async (e) => {

      e.preventDefault();

      try {

        const formData =
          new FormData();

        formData.append(
          "mentorId",
          user._id
        );

        formData.append(
          "title",
          title
        );

        formData.append(
          "category",
          category
        );

        formData.append(
          "pdf",
          pdf
        );

        await axios.post(
          "http://localhost:5000/api/notes",
          formData
        );

        alert(
          "PDF Uploaded Successfully"
        );

        setTitle("");
        setCategory("");
        setPdf(null);

      } catch (error) {

        console.log(error);

        alert(
          "Upload Failed"
        );

      }
    };

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-lg">

        <h1 className="text-3xl font-bold mb-2">
  Upload Resource
</h1>

<p className="text-gray-500 mb-6">
  Share study materials and learning resources with students.
</p>

        <form
          onSubmit={submitHandler}
        >

          <select
  value={category}
  onChange={(e) =>
    setCategory(
      e.target.value
    )
  }
  className="w-full border p-3 rounded mb-4"
  required
>

  <option value="">
    Select Category
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
     <input
  type="text"
  placeholder="Resource Title"
  value={title}
  onChange={(e) =>
    setTitle(
      e.target.value
    )
  }
  className="w-full border p-3 rounded mb-4"
  required
/>
          <input
  type="file"
  accept=".pdf"
  onChange={(e) =>
    setPdf(
      e.target.files[0]
    )
  }
  className="w-full border border-gray-300 p-3 rounded-xl mb-4"
  required
/>

          <button
  type="submit"
  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
>
  Upload Resource
</button>

        </form>

      </div>

    </div>
  );
}

export default UploadNote;