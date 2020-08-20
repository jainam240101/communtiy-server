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
  applyforProjectresolver,
} from "./utils/utils";
import { MyContext } from "../../Types/Context";
import { Project } from "../../entities/Project";
import { User } from "../../entities/User";

@Resolver()
export class ProjectResolver {
  @Query(() => [Project])
  async projectsInfo(@Arg("data") { id }: projectInfo) {
    var projects: Project | Project[] | undefined;
    if (id !== undefined) {
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
    return createProjectResolver({
      definition,
      totalMembers,
      techStack,
      user: ctx.req.currentUser.uniqueid,
    });
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Project)
  async updateProject(
    @Ctx() ctx: MyContext,
    @Arg("data")
    { uniqueid, definition, totalMembers, techStack }: updateProjectInput
  ): Promise<Project | undefined> {
    return updateProjectresolver({
      uniqueid,
      user: ctx.req.currentUser.uniqueid,
      definition,
      totalMembers,
      techStack,
    });
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Project)
  async deleteProject(
    @Ctx() ctx: MyContext,
    @Arg("data")
    { uniqueid }: deleteProjectInput
  ): Promise<Project | undefined> {
    return await deleteProjectresolver({
      user: ctx.req.currentUser.uniqueid,
      uniqueid: uniqueid,
    });
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Project, { nullable: true })
  async userApply(
    @Arg("projectId") projectId: string,
    @Ctx() Ctx: MyContext
  ): Promise<Project | undefined | String> {
    const result = await applyforProjectresolver(
      projectId,
      Ctx.req.currentUser.uniqueid
    );
    console.log(result);
    return result;
  }
}
