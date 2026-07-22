import { useState } from "react";
import axios from "axios";

function CreateSlot() {

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  const [formData, setFormData] =
  useState({
    title: "",
    date: "",
    time: "",
    sessionType: "one-to-one",
    capacity: 1,

    meetingPlatform:
      "Google Meet",

    meetingLink: "",
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      if (
  !formData.meetingLink
) {

  alert(
    "Meeting Link Required"
  );

  return;

}

try {

  new URL(
    formData.meetingLink
  );

} catch {

  alert(
    "Enter Valid Meeting Link"
  );

  return;

}

      try {

        await axios.post(
          "http://localhost:5000/api/session-slots",
          {
            ...formData,
            mentorId:
              user._id,
          }
        );

        alert(
          "Session Slot Created"
        );

      } catch (error) {

        console.log(error);

        alert(
          "Failed"
        );

      }
    };

  return (
    <div className="p-10">

      <h1 className="text-4xl font-bold mb-6">
        Create Session Slot
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 max-w-lg"
      >

        <input
          type="text"
          name="title"
          placeholder="Title"
          className="border p-3 w-full"
          onChange={handleChange}
        />

        <input
          type="date"
          name="date"
          className="border p-3 w-full"
          onChange={handleChange}
        />

        <input
          type="time"
          name="time"
          className="border p-3 w-full"
          onChange={handleChange}
        />

        <select
          name="sessionType"
          className="border p-3 w-full"
          onChange={handleChange}
        >

          <option value="one-to-one">
            One To One
          </option>

          <option value="group">
            Group Session
          </option>

        </select>

        <input
          type="number"
          name="capacity"
          placeholder="Capacity"
          className="border p-3 w-full"
          onChange={handleChange}
        />
        <select
  name="meetingPlatform"
  className="border p-3 w-full"
  onChange={handleChange}
>

  <option>
    Google Meet
  </option>

  <option>
    Zoom
  </option>

  <option>
    Microsoft Teams
  </option>

</select>
        <input
  type="url"
  name="meetingLink"
  placeholder="Paste Meeting Link"
  className="border p-3 w-full"
  onChange={handleChange}
/>
        <button
          type="submit"
          className="bg-black text-white px-6 py-3 rounded"
        >
          Create Slot
        </button>

      </form>

    </div>
  );
}

export default CreateSlot;