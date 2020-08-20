/** @format */

import { User, UserLoginEntity } from "../../../entities/User";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import { createUserInput, loginInput, updateUserInput } from "../inputs/input";
import jwt from "jsonwebtoken";
import { getConnection } from "typeorm";
import { Project } from "../../../entities/Project";
import {ApolloError } from "apollo-server-express"

export const registerUser = async ({
  name,
  description,
  email,
  enrollment,
  password,
}: createUserInput) => {
  try {
    const hasedpassword = await bcrypt.hash(password, 12);
    return User.create({
      uniqueid: uuidv4(),
      name: name,
      email: email,
      password: hasedpassword,
      enrollment: enrollment,
      description: description,
      createdAt: new Date(),
      updatedAt: new Date(),
    }).save();
  } catch (error) {
    throw new ApolloError("Some Error Occured in creating a User");
  }
};

export const loginResolver = async ({
  email,
  password,
}: loginInput): Promise<UserLoginEntity | undefined> => {
  try {
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      return undefined;
    }
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      return undefined;
    }
    const token = jwt.sign({ id: user.uniqueid }, "stackapi");
    return {
      name: String(user.name),
      email: user.email,
      enrollment: user.enrollment,
      description: user.description,
      token: token,
    };
  } catch (error) {
    throw new ApolloError("Invalid Credentials");
  }
};

export const updateUser = async ({
  email,
  password,
  description,
  user,
}: updateUserInput) => {
  try {
    if (email !== undefined) {
      user.email = email;
    }
    if (password !== undefined) {
      const hasedpassword = await bcrypt.hash(password, 12);
      user.password = hasedpassword;
    }
    if (description !== undefined) {
      user.description = description;
    }
    user.updatedAt=new Date()
    return user.save();
  } catch (error) {
    throw new ApolloError("Some Error occured in updating the user");
  }
};

export const deleteUserresolver = async (user: User) => {
  try {
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(User)
      .where({ uniqueid: user.uniqueid })
      .execute();
    return "Success";
  } catch (error) {
    throw new ApolloError("Some Error Occured in Deleting");
  }
};

export const meResolver = async (userid: string) => {
  return Project.find({
    where: {
      ownerId: userid,
    },
  });
};
