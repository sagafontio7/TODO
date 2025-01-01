import React from "react";

function Signup() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center">Signup</h1>
      <form>
        <input type="text" placeholder="Type your username" />
        <input type="text" placeholder="Type your email" />
        <input type="password" placeholder="Type your Password" />
      </form>
    </div>
  );
}

export default Signup;
