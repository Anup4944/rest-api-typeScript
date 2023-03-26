import express from "express";
import { deleteUserById, getUserById, getUsers } from "../db/users";

export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const allUsers = await getUsers();

    return res.status(200).json(allUsers);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const deleteUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    const deletedUsers = await deleteUserById(id);
    return res.json(deletedUsers);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const updateUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    const { username } = req.body;

    if (!username) {
      return res.sendStatus(400);
    }

    const user = await getUserById(id);

    user.username = username;

    await user.save();

    return res.status(400).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
