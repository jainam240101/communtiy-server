/** @format */

import {
  Resolver,
  Mutation,
  Arg,
  UseMiddleware,
  Ctx,
  Query,
} from "type-graphql";
import {
  createProjectInput,
  updateProjectInput,
  deleteProjectInput,
  projectInfo,
} from "./Inputs/Input";
import { isAuth } from "../../Middlewares/UserAuth/isAuth";
import {
  createProjectResolver,
  updateProjectresolver,
  deleteProjectresolver,
} from "./utils/utils";
import { MyContext } from "../../Types/Context";
import { Project } from "../../entities/Project";
import { User } from "../../entities/User";

@Resolver()
export class ProjectResolver {
  @Query(() => [Project])
  async projectsInfo(@Arg("data") { id }: projectInfo) {
    var projects: Project | Project[] | undefined;
    if (id.length !== 0) {
      projects = await Project.findOne({
        where: {
          uniqueid: id,
        },
      });
      const owner = await User.findOne({
        where: {
          uniqueid: projects?.ownerId,
        },
      });
      return [{ ...projects, projectOwner: owner }];
    }
    projects = await Project.find();
    var allprojects: any[] = [];
    for (var i = 0; i < projects.length; i++) {
      var owner = await User.findOne({
        where: {
          uniqueid: projects[i].ownerId,
        },
      });
      allprojects.push({ ...projects[i], projectOwner: owner });
    }
    return allprojects;
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Project)
  async createProject(
    @Ctx() ctx: MyContext,
    @Arg("data") { definition, totalMembers, techStack }: createProjectInput
  ): Promise<Project | undefined> {
    const result: Project = await createProjectResolver({
      definition,
      totalMembers,
      techStack,
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
    { uniqueid, definition, totalMembers, techStack }: updateProjectInput
  ): Promise<Project | undefined> {
    const result = await updateProjectresolver({
      uniqueid,
      user: ctx.req.currentUser.uniqueid,
      definition,
      totalMembers,
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
