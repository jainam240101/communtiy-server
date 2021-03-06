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
  tag,
  title,
  techStack,
  formLink,
  user,
}: createProjectInput) => {
  try {
    return Project.create({
      title: title,
      definition: definition,
      techStack: techStack,
      formLink: formLink,
      uniqueid: uuidv4(),
      createdAt: new Date(),
      tag: tag,
      ownerId: user,
    }).save();
  } catch (error) {
    throw new ApolloError("Some Error Occured");
  }
};

export const updateProjectresolver = async ({
  definition,
  uniqueid,
  tag,
  formLink,
  title,
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
    if (title !== undefined) {
      project.title = title;
    }
    if (tag !== undefined) {
      project.tag = tag;
    }
    if (formLink !== undefined) {
      project.formLink = formLink;
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

export const projectDisplayTagResolver = async ({ tag, techStack }: any) => {
  try {
    const projects: Project[] = await Project.find({
      where: {
        tag: tag,
      },
      order: { createdAt: "DESC" },
    });
    if (techStack) {
      const projectsTechStack: Project[] = [];
      projects.forEach((element) => {
        element.techStack.forEach((tech) => {
          if (tech === techStack) {
            projectsTechStack.push(element);
          }
        });
      });
      return projectsTechStack;
    }
    return projects;
  } catch (error) {
    throw new ApolloError("Some error occured");
  }
};
