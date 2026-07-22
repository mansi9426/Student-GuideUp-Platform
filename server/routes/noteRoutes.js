const express =
  require("express");

const router =
  express.Router();

const upload =
  require("../middleware/upload");

const {
  uploadNote,
  getNotes,
  deleteNote
} = require(
  "../controllers/noteController"
);

/*
====================
Upload Note
====================
*/
router.post(
  "/",
  upload.single("pdf"),
  uploadNote
);

/*
====================
Get Notes
====================
*/
router.get(
  "/",
  getNotes
);

router.delete(
  "/:id",
  deleteNote
);


module.exports =
  router;