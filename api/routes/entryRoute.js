const express = require("express");
const {
  createEntry,
  getAllEntries,
  getEntryBySlug,
  updateEntryBySlug,
  deleteEntryBySlug,
  getLikedUsersForEntity,
  unlikeEntry,
  getLikedEntries,
  likeEntry,
} = require("../controllers/entryController");
const jwtRoleHandler = require("../middleware/roleHandler");

const router = express.Router();

router.route("/").post(createEntry);
router.route("/").get(getAllEntries);
router.route("/:slug").get(getEntryBySlug);
router.route("/:slug").put(updateEntryBySlug);
router.route("/:slug").delete(jwtRoleHandler(["ADMIN", "USER"]), deleteEntryBySlug);
router.post("/:entryId/like", likeEntry);
router.get("/users/:userId/liked-entries", getLikedEntries);
router.delete("/:entryId/unlike", unlikeEntry);
router.get("/:entryId/liked-users", getLikedUsersForEntity);

module.exports = router;
