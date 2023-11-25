import Audio from "#/models/audio";
import Favorite from "#/models/favorite";
import { RequestHandler } from "express-serve-static-core";
import { isValidObjectId } from "mongoose";

export const toggleFavorite: RequestHandler = async (req, res) => {
  const audioId = req.query.audioId as string;

  if (!isValidObjectId(audioId))
    return res.status(422).json({ error: "Audio id is invalid!" });

  const audio = await Audio.findById(audioId);

  if (!audio) return res.status(404).json({ error: "Resources not found!" });

  //audio is already in favorite
  const alreadyExists = await Favorite.findOne({
    owner: req.user.id,
    item: audioId,
  });
  if (alreadyExists) {
    //we want to remove from old list
    await Favorite.updateOne(
      { owner: req.user.id },
      {
        $pull: { items: audioId },
      }
    );
  } else {
    const favorite = await Favorite.findOne({ owner: req.user.id });
    if (favorite) {
      //try to add new audio to the old list
      await Favorite.updateOne(
        { owner: req.user.id },
        {
          $addToSet: { items: audioId },
        }
      );
    } else {
      //try to create fresh favorite list
      await Favorite.create({ owner: req.user.id, items: [audioId] });
    }
  }
};
