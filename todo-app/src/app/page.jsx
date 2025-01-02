import React from "react";
import Login from "./components/Login/page";

export default function Home() {
  return (
    <>
      <h1 className="text-2xl text-white text-center">
        Welcome to the Todo App
      </h1>
      <Login />
    </>
  );
}
