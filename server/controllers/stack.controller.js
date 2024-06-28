import Post from "../models/Post.js";
import StudyStack from "../models/StudyStack.js";
import User from "../models/User.js";

export const saveStack = async (req, res) => {
  const { stack_id, username } = req.body;

  try {
    // Find the user by username
    const foundUser = await User.findOne({
      "personal_info.username": username,
    }).select("studystacks");

    if (!foundUser) {
      return res.status(404).json({ Error: "User not found" });
    }

    // Find the study stack document to update
    const foundStack = await StudyStack.findOne({ stack_id }).select(
      "saved_by_user"
    );

    if (!foundStack) {
      return res.status(404).json({ Error: "Study stack not found" });
    }

    // Update the user's list of study stacks
    foundUser.studystacks.push(foundStack._id);
    await foundUser.save();

    foundStack.saved_by_user.push(foundUser._id);
    await foundStack.save();

    // Send the updated saved_by_user value back to the frontend
    return res
      .status(200)
      .json({
        Message: `Saved successfully 👍`,
        count: foundStack.saved_by_user.length,
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ Error: "Internal server error" });
  }
};

export const isSaved = async (req, res) => {
  const { stack_id, username } = req.body;

  try {
    const foundUser = await User.findOne({
      "personal_info.username": username,
    }).select("_id");

    if (!foundUser) {
      return res.status(404).json({ Error: "User not found" });
    }

    // Now use the foundUser._id to query the StudyStack
    const foundStack = await StudyStack.findOne({
      stack_id,
      saved_by_user: foundUser._id,
    });

    if (!foundStack) {
      return res.status(200).json({ saved: false });
    } else {
      return res.status(200).json({ saved: true });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ Error: "Internal server error" });
  }
};

export const savedCount = async (req, res) => {
  const { stack_id } = req.body;

  try {
    const foundStack = await StudyStack.findOne({ stack_id }).select(
      "saved_by_user"
    );

    if (!foundStack) {
      return res.status(404).json({ Error: "Study stack not found" });
    }
    return res.status(200).json({ count: foundStack.saved_by_user.length });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ Error: error.message });
  }
};

export const removeSavedStack = async (req, res) => {
  const { stack_id, username } = req.body;

  try {
    // Find the user by username
    const foundUser = await User.findOne({
      "personal_info.username": username,
    }).select("studystacks");

    if (!foundUser) {
      return res.status(404).json({ Error: "User not found" });
    }

    // Find the study stack document to update
    const foundStack = await StudyStack.findOne({ stack_id }).select(
      "saved_by_user creator"
    );

    if (!foundStack) {
      return res.status(404).json({ Error: "Study stack not found" });
    }

    // Check if the user is the creator of the stack
    if (foundStack.creator.toString() === foundUser._id.toString()) {
      // If the user is the creator, do not remove the post from their saved list
      return res
        .status(403)
        .json({ Error: "Creator cannot unsave their own stack 😕🔒" });
    }

    // Update the user's list of study stacks
    foundUser.studystacks.pull(foundStack._id);
    await foundUser.save();

    foundStack.saved_by_user.pull(foundUser._id);
    await foundStack.save();

    // Send the updated saved_by_user value back to the frontend
    return res
      .status(200)
      .json({
        Message: `Removed successfully 👍`,
        count: foundStack.saved_by_user.length,
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ Error: error.message });
  }
};

export const deleteStudyStackAll = async (req, res) => {
  const { stack_id, username } = req.body;

  try {
    // Find the user based on username
    const foundUser = await User.findOne({ "personal_info.username": username })
      .select("studystacks")
      .exec();

    if (!foundUser) {
      return res.status(404).json({ Error: "User not found" });
    }

    // Find the study stack document to delete
    const foundStack = await StudyStack.findOne({ stack_id }).exec();

    if (!foundStack) {
      return res.status(404).json({ Error: "Study stack not found" });
    }

    // Remove the study stack from the user's list of study stacks
    foundUser.studystacks.pull(foundStack._id);
    await foundUser.save();

    // Delete the study stack document from the StudyStack collection
    await StudyStack.findByIdAndDelete(foundStack._id);

    return res
      .status(200)
      .json({ Message: "Studystack deleted successfully 👍" });
  } catch (err) {
    return res.status(500).json({ Error: err.message });
  }
};

export const editStack = async (req, res) => {
  const {title, description, stack_id} = req.body;

  try {
    // Find the study stack document to update
    const foundStack = await StudyStack.findOne({ stack_id });

    if (!foundStack) {
      return res.status(404).json({ Error: "Study stack not found"});
    }

    // Update the study stack
    foundStack.title = title;
    foundStack.description = description;
    await foundStack.save();

    return res
     .status(200)
     .json({ Message: "Studystack updated successfully 👍" });
  } catch (err) {
    return res.status(500).json({ Error: err.message });
  }
};

export const removePost = async (req, res) => {
  const { stack_id, post_id } = req.body;

  try {
    const foundPost = await Post.findOne({ post_id });
    if (!foundPost) {
      return res.status(404).json({ Error: "Post not found"});
    }

    const foundStack = await StudyStack.findOne({ stack_id });

    if (!foundStack) {
      return res.status(404).json({ Error: "Studystack not found"});
    }

    foundStack.posts.pull(foundPost._id);
    await foundStack.save();

    return res.status(200).json({Message: "Successfully removed from "})
  } catch (error) {
    return res.status(500).json({Error: error.message})
  }
};