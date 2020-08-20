/** @format */

import {
  createProjectInput,
  updateProjectInput,
  deleteProjectInput,
} from "../Inputs/Input";
import { Project } from "../../../entities/Project";
import { v4 as uuidv4 } from "uuid";
import { getConnection } from "typeorm";
import { ApolloError } from "apollo-server-express";

export const createProjectResolver = async ({
  definition,
  totalMembers,
  techStack,
  user,
}: createProjectInput) => {
  try {
    return Project.create({
      definition: definition,
      techStack: techStack,
      uniqueid: uuidv4(),
      totalMembers: totalMembers,
      usersApplied: [],
      ownerId: user,
    }).save();
  } catch (error) {
    throw new ApolloError("Some Error Occured");
  }
};

export const updateProjectresolver = async ({
  definition,
  uniqueid,
  totalMembers,
  techStack,
  user,
}: updateProjectInput): Promise<Project | undefined> => {
  try {
    const project = await Project.findOne({
      where: {
        uniqueid: uniqueid,
        ownerId: user,
      },
    });
    if (project === undefined) {
      return undefined;
    }
    if (definition !== undefined) {
      project.definition = definition;
    }
    if (totalMembers !== undefined) {
      project.totalMembers = totalMembers;
    }
    if (techStack !== undefined) {
      project.techStack = techStack;
    }
    return project.save();
  } catch (error) {
    throw new ApolloError("Some Error Occured");
  }
};

export const deleteProjectresolver = async ({
  user,
  uniqueid,
}: deleteProjectInput) => {
  try {
    const project = await Project.findOne({
      where: {
        uniqueid: uniqueid,
        ownerId: user,
      },
    });
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Project)
      .where({ ownerId: user, uniqueid: uniqueid })
      .execute();
    return project;
  } catch (error) {
    throw new ApolloError("Some Error Occured in Deleting");
  }
};

export const applyforProjectresolver = async (
  projectId: string,
  userId: string
): Promise<String | Project | undefined> => {
  const project = await Project.findOne({
    where: {
      uniqueid: projectId,
    },
  });
  if (project === undefined) {
    throw new ApolloError("No Such Project Found");
  }
  if (String(project.ownerId) === userId) {
    throw new ApolloError("The Owner of the project cant apply");
  }
  if (project.usersApplied.includes(userId)) {
    throw new ApolloError("User has Already Applied")
  }
  project.usersApplied.push(userId);
  return project.save();
};
