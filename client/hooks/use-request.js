import axios from "axios";
import { useState } from "react";

export const useRequest = ({ url, method, body, onSuccess }) => {
  const [error, setError] = useState(null);

  const makeRequest = async () => {
    try {
      setError(null);
      const response = await axios[method](url, body);
      if(onSuccess) {
        onSuccess(response.data)
      }
      return response.data;
    } catch (err) {
      setError(
        <div className="alert alert-danger">
          <h4>Oh Snap!!!</h4>
          <ul className="my-0">
            {err.response.data.errors.map((error) => (
              <li key={error.message}>{error.message}</li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return { makeRequest, error };
};
