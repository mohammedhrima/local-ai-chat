import mongoose, { Schema, model, models } from "mongoose";

export interface MessageDoc {
  role: "user" | "assistant";
  content: string;
  createdAt: Date;
}

export interface ChatDoc {
  _id: mongoose.Types.ObjectId;
  name: string;
  userId: mongoose.Types.ObjectId;
  messages: MessageDoc[];
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new Schema<MessageDoc>(
  {
    role: { type: String, enum: ["user", "assistant"], required: true },
    content: { type: String, required: true },
  },
  { _id: false, timestamps: { createdAt: true, updatedAt: false } },
);

const chatSchema = new Schema<ChatDoc>(
  {
    name: { type: String, required: true, default: "New Chat" },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    messages: { type: [messageSchema], default: [] },
  },
  { timestamps: true },
);

export const Chat = models.Chat || model<ChatDoc>("Chat", chatSchema);
