/** @format */

import React from "react";
import { cache } from "../..";
import { findUniqueId } from "../../Custom Queries/user";
import Edit_Delete from "../Edit_Delete/Edit_Delete";
import classes from "./Answers.module.css";

interface Props {
  id: string;
  answer: string;
  owner: {
    name: string;
    uniqueid: string;
  };
}

const AnswersComponent: React.FC<Props> = ({ answer, owner, id }) => {
  const data: any = cache.readQuery({
    query: findUniqueId,
  });
  console.log(data.me.uniqueid);
  console.log(owner.uniqueid);
  return (
    <div className={classes.Container}>
      <div className={classes.answer}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </div>
      <div className={classes.bottomContainer}>
        <span className={classes.Owner}>{owner.name}</span>Written By:
      </div>
      {data.me.uniqueid === owner.uniqueid ? (
        <div>
          <Edit_Delete type={"editissue"} id={id} />
        </div>
      ) : null}
    </div>
  );
};
export default AnswersComponent;
