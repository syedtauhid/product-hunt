import React from "react";

const LoginWiget = ({ userLogin, onChange }) => {
  return (
    <form>
      <div className="form-group">
        <label>User name:</label>
        <input
          type="text"
          className="form-control"
          value={userLogin.userName}
          onChange={e => onChange(e.currentTarget.value, "userName")}
          placeholder="Enter user name"
        />
      </div>
      <div className="form-group">
        <label>Password:</label>
        <input
          type="password"
          className="form-control"
          value={userLogin.password}
          onChange={e => onChange(e.currentTarget.value, "password")}
          placeholder="Enter password"
        />
      </div>
    </form>
  );
};

export default LoginWiget;
