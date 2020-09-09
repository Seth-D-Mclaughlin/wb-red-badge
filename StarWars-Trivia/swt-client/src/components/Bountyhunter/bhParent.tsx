import React, { Component } from "react";
import GetQuestions from "../Questions/get_questions";
import CreateBounty from "./bhCreate";
import Main from "../Main/Main";
import { BrowserRouter, Route, Switch } from "react-router-dom";

type TokenProp = {
  token: string;
  bhName: string;
  setName: any;
};
// declare global{
//   interface Window{}
// }
let quiz = window["location"].pathname;
let x = "/quiz";
console.log(typeof quiz);
const BhParent = ({ token, bhName, setName }: TokenProp) => {
  return (
    <div>
      {bhName ? (
        <Main bhName={bhName} />
      ) : (
        <CreateBounty token={token} setName={setName} />
      )}
    </div>
  );
};

export default BhParent;
