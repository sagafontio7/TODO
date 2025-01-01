import React from "react";

function Login() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center">Login</h1>
      <form>
        <input type="text" placeholder="Type your username" />
        <input type="password" placeholder="Type your Password" />
      </form>
    </div>
  );
}

export default Login;
