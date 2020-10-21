/** @format */

import { useReducer, useRef } from "react";

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "editIssueinitialState":
      var newState = { ...state };
      newState.Name = action.values.Name;
      newState.Issue = action.values.Issue;
      newState.tag = action.values.tag;
      return newState;
    case "change":
      var changedState = { ...state };
      changedState[action.name] = action.value;
      console.log(changedState);
      return changedState;
    case "editProjectInititalState":
      var newState = { ...state };
      newState.Title = action.values.Title;
      newState.Definition = action.values.Definition;
      newState.FormLink = action.values.FormLink;
      newState.Tag = action.values.Tag;
      newState.TechStack = action.values.TechStack;
      console.log(newState);
      return newState;
    default:
      return state;
  }
};

export const useForm = (initialValues: any) => {
  const [state, dispatch] = useReducer(reducer, initialValues);
  return [state, dispatch];
};
