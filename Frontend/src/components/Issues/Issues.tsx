/** @format */

import React from "react";
import { cache } from "../..";
import { findUniqueId } from "../../Custom Queries/user";
import Edit_Delete from "../Edit_Delete/Edit_Delete";
import classes from "./Issues.module.css";

interface Props {
  issueName: string;
  issue: string;
  tag: string;
  uniqueid: string;
  createdAt: Date;
  issueOwner: {
    name: string;
    email: string;
    uniqueid: string;
  };
}

const IssueComponent: React.FC<Props> = ({
  createdAt,
  tag,
  issue,
  issueName,
  issueOwner,
  uniqueid,
}) => {
  const data: any = cache.readQuery({
    query: findUniqueId,
  });
  return (
    <div>
      <div className={classes.Container}>
        <div className={classes.headerContainer}>
          <p className={classes.heading}>{issueName}</p>
        </div>
        <div className={classes.content}>{issue}</div>
        <div className={classes.btnContainer}>
          <button className={classes.btn}>Answers</button>
          <p className={tag.length < 10 ? classes.smallTag : classes.bigTag}>
            {tag}
          </p>
          {data.me.uniqueid === issueOwner.uniqueid ? (
            <div>
              <Edit_Delete type={"editissue"} id={uniqueid} />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default IssueComponent;
