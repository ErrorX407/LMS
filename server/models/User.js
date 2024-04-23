import mongoose, { Schema } from "mongoose";

let profile_imgs_name_list = [
  "Garfield",
  "Tinkerbell",
  "Annie",
  "Loki",
  "Cleo",
  "Angel",
  "Bob",
  "Mia",
  "Coco",
  "Gracie",
  "Bear",
  "Bella",
  "Abby",
  "Harley",
  "Cali",
  "Leo",
  "Luna",
  "Jack",
  "Felix",
  "Kiki",
  "Tree",
  "Apple",
  "Indian",
  "Ball",
  "Cat",
  "Whimsical",
  "Serene",
  "Cascade",
  "Quagmire",
  "Ethereal",
  "Radiant",
  "Enigma",
  "Tranquil",
  "Aurora",
  "Labyrinth",
  "Mellifluous",
  "Bucolic",
  "Zephyr",
  "Ephemeral",
  "Solitude",
  "Jubilant",
  "Verdant",
  "Sonorous",
  "Halcyon",
  "Serendipity",
  "Blissful",
  "Echo",
  "Effervescent",
  "Mystical",
  "Quixotic",
  "Velvety",
  "Cascade",
  "Ethereal",
  "Enigmatic",
  "Radiant",
  "Tranquil",
  "Aurora",
  "Luminous",
  "Breeze",
  "Mellifluous",
  "Serene",
  "Whisper",
  "Jubilant",
  "Reverie",
  "Blossom",
  "Quixotic",
  "Luminescent",
  "Mellifluous",
  "Perennial",
  "Serendipity",
  "Resplendent",
  "Jubilant",
  "Enthralling",
  "Cascade",
  "Nebulous",
  "Ethereal",
  "Serene",
  "Luminous",
  "Euphoric",
  "Enigmatic",
  "Mellifluent",
  "Verdant",
  "Vivacious",
  "Tranquil",
  "Exquisite",
];
let profile_imgs_collections_list = [
  // "adventurer-neutral",
  // "notionists-neutral",
  "fun-emoji",
];

const userSchema = mongoose.Schema(
  {
    personal_info: {
      fullName: {
        type: String,
        required: true,
        minlength: [3, "fullname must be 3 letters long"],
      },
      email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
      },
      password: String,
      username: {
        type: String,
        minlength: [3, "Username must be 3 letters long"],
        unique: true,
      },
      bio: {
        type: String,
        maxlength: [200, "Bio should not be more than 200"],
        default: "",
      },
      profile_img: {
        type: String,
        default: () => {
          return `https://api.dicebear.com/6.x/${
            profile_imgs_collections_list[
              Math.floor(Math.random() * profile_imgs_collections_list.length)
            ]
          }/svg?seed=${
            profile_imgs_name_list[
              Math.floor(Math.random() * profile_imgs_name_list.length)
            ]
          }`;
        },
      },
    },
    admin: {
      type: Boolean,
      default: false,
    },
    social_links: {
      youtube: {
        type: String,
        default: "",
      },
      instagram: {
        type: String,
        default: "",
      },
      facebook: {
        type: String,
        default: "",
      },
      twitter: {
        type: String,
        default: "",
      },
      github: {
        type: String,
        default: "",
      },
      website: {
        type: String,
        default: "",
      },
    },
    account_info: {
      total_posts: {
        type: Number,
        default: 0,
      },
      total_reads: {
        type: Number,
        default: 0,
      },
    },
    posts: {
      type: [Schema.Types.ObjectId],
      ref: "posts",
      default: [],
    },
    playlists: [
      {
        type: Schema.Types.ObjectId,
        ref: "Playlist",
      },
    ],
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: {
      createdAt: "joinedAt",
    },
  }
);

export default mongoose.model("users", userSchema);
