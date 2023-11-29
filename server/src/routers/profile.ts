import {
  getPublicPlaylist,
  getPublicProfile,
  getPublicUploads,
  getUploads,
  updateFollower,
} from "#/controllers/profile";
import { mustAuth } from "#/middleware/auth";
import { Router } from "express";

const router = Router();

router.post("/update-follower/:profileId", mustAuth, updateFollower);
router.get("/uploads", mustAuth, getUploads);
router.get("/uploads/:profileId", mustAuth, getPublicUploads);
router.get("/info/:profileId", mustAuth, getPublicProfile);
router.get("/playlist/:profileId", getPublicPlaylist);

export default router;
