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
      return changedState;
    case "editProjectInititalState":
      var newState = { ...state };
      newState.Title = action.values.Title;
      newState.Definition = action.values.Definition;
      newState.FormLink = action.values.FormLink;
      newState.Tag = action.values.Tag;
      newState.TechStack = action.values.TechStack;
      return newState;
    case "edituserInitialState":
      var newState = { ...state };
      newState.Description = action.values.Description;
      newState.Email = action.values.Email;
      newState.Enrollment = action.values.Enrollment;
      newState.Password = action.values.Password;
      return newState;
    default:
      return state;
  }
};

export const useForm = (initialValues: any) => {
  const [state, dispatch] = useReducer(reducer, initialValues);
  return [state, dispatch];
};
