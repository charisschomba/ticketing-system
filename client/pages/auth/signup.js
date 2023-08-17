import { useState } from "react";
import axios from "axios";
import { useRequest } from "../../hooks/use-request";

export default () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const { makeRequest, error } = useRequest({
    url: "/api/v1/auth/signup",
    body: { password, email },
    method: "post",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    makeRequest();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign Up</h1>
      <div className="form-group">
        <label>Email</label>
        <input
          className="form-control"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error}
      <button className="btn btn-primary">Sign Up</button>
    </form>
  );
};
