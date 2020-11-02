/** @format */

import {
  Resolver,
  Mutation,
  Arg,
  UseMiddleware,
  Ctx,
  Query,
  FieldResolver,
  Root,
} from "type-graphql";
import {
  createProjectInput,
  updateProjectInput,
  deleteProjectInput,
  projectInfo,
  tagInput,
} from "./Inputs/Input";
import { isAuth } from "../../Middlewares/UserAuth/isAuth";
import {
  createProjectResolver,
  updateProjectresolver,
  deleteProjectresolver,
  projectDisplayTagResolver,
} from "./utils/utils";
import { MyContext } from "../../Types/Context";
import { Project } from "../../entities/Project";
import { User } from "../../entities/User";
import { ApolloError } from "apollo-server-express";

@Resolver(() => Project)
export class ProjectResolver {
  @FieldResolver()
  async projectOwner(@Root() parent: Project) {
    try {
      const owner: User | undefined = await User.findOne({
        where: { uniqueid: parent.ownerId },
      });
      return owner;
    } catch (error) {
      throw new ApolloError("Project Owner Not Found");
    }
  }

  @Query(() => [Project])
  async projectsInfo(@Arg("data") { id, limit }: projectInfo) {
    var projects: Project | Project[] | undefined;
    if (id.length !== 0) {
      projects = await Project.findOne({
        where: {
          uniqueid: id,
        },
      });
      return [projects];
    }
    projects = await Project.find({
      order: {
        createdAt: "DESC",
      },
      take: limit,
    });
    return projects;
  }

  @Query(() => [Project])
  async projectDisplayTag(
    @Arg("data") { tag, techStack }: tagInput
  ): Promise<Project[]> {
    if (tag === "All") {
      var allProjects = await Project.find({
        order: {
          createdAt: "DESC",
        },
      });
      if (techStack) {
        const projectsTechStack: Project[] = [];
        allProjects.forEach((element) => {
          element.techStack.forEach((tech) => {
            if (tech === techStack) {
              projectsTechStack.push(element);
            }
          });
        });
        return projectsTechStack;
      }
      return allProjects;
    }
    const result: Project[] = await projectDisplayTagResolver({
      tag,
      techStack,
    });
    return result;
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Project)
  async createProject(
    @Ctx() ctx: MyContext,
    @Arg("data")
    { definition, formLink, tag, techStack, title }: createProjectInput
  ): Promise<Project | undefined> {
    const result: Project = await createProjectResolver({
      definition,
      title,
      tag,
      techStack,
      formLink,
      user: ctx.req.currentUser.uniqueid,
    });
    result.projectOwner = ctx.req.currentUser;
    return result;
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Project)
  async updateProject(
    @Ctx() ctx: MyContext,
    @Arg("data")
    {
      uniqueid,
      definition,
      tag,
      title,
      formLink,
      techStack,
    }: updateProjectInput
  ): Promise<Project | undefined> {
    const result = await updateProjectresolver({
      uniqueid,
      title,
      user: ctx.req.currentUser.uniqueid,
      definition,
      formLink,
      tag,
      techStack,
    });
    result!.projectOwner = ctx.req.currentUser;
    return result;
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Project)
  async deleteProject(
    @Ctx() ctx: MyContext,
    @Arg("data")
    { uniqueid }: deleteProjectInput
  ): Promise<Project | undefined> {
    const result = await deleteProjectresolver({
      user: ctx.req.currentUser.uniqueid,
      uniqueid: uniqueid,
    });
    result!.projectOwner = ctx.req.currentUser;
    return result;
  }
}
