import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import prisma from "../db/prisma.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;
    const { id: recieverId } = req.params;
    const senderId = req.user.id;

    let conversation = await prisma.conversation.findFirst({
      where: {
        participantIds: {
          hasEvery: [senderId, recieverId],
        },
      },
    });
    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: {
          participantIds: {
            set: [senderId, recieverId],
          },
        },
      });
    }
    const newMessage = await prisma.message.create({
      data: {
        senderId,
        body: message,
        conversationId: conversation.id,
      },
    });

    if (newMessage) {
      conversation = await prisma.conversation.update({
        where: {
          id: conversation.id,
        },
        data: {
          messages: {
            connect: {
              id: newMessage.id,
            },
          },
        },
      });
    }

    const receiverSocketId = getReceiverSocketId(recieverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(StatusCodes.CREATED).json(newMessage);
  } catch (err: any) {
    console.log("Error in sendMessage controller", err.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Something went wrong" });
  }
};

export const getMessages = async (req: Request, res: Response) => {
  try {
    const { id: recieverId } = req.params;
    const senderId = req.user.id;
    const conversation = await prisma.conversation.findFirst({
      where: {
        participantIds: {
          hasEvery: [senderId, recieverId],
        },
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });
    if (!conversation) {
      return res.status(StatusCodes.OK).json([]);
    }
    res.status(StatusCodes.OK).json(conversation.messages);
  } catch (err: any) {
    console.log("Error in getMessages controller", err.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Something went wrong" });
  }
};

export const getConversations = async (req: Request, res: Response) => {
  try {
    const currentUserId = req.user.id;
    const users = await prisma.user.findMany({
      where: {
        id: {
          not: currentUserId,
        },
      },
      select: {
        id: true,
        fullName: true,
        profilePic: true,
      },
    });
    res.status(StatusCodes.OK).json(users);
  } catch (err: any) {
    console.log("Error in getConversations controller", err.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Something went wrong" });
  }
};
