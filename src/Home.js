import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Home = () => {
    
  let navigate = useNavigate();
//   const [urlName, setUrlName] = useState("");
  const [url, setUrl] = useState("");

  useNavigate();

  async function callApi(e) {
    e.preventDefault();
    axios
      .post("https://rajdeep345.pythonanywhere.com/api/uploadUrl/", {
        // urlName: urlName,
        url : url
      })
      .then((resp) => {
        console.log(resp.data);
        localStorage.setItem("objectId",resp.data.objectId)
        navigate('/sentences')
      })
      .catch((error) => {
        console.error(error.response);
      });
  }

  return (
    <div>
      <div className="container mt-5">
        <form>
          <div class="form-group">
          {/* <label for="websiteUrl">Enter Website Name</label>
            <input
              type="url"
              class="form-control"
              id="websiteUrl"
              placeholder="Enter Website Name"
              onChange={(e) => setUrlName(e.target.value)}
            /> */}
            <br/>
            <label for="websiteUrl">Enter Website URL</label>
            <input
              type="url"
              class="form-control"
              id="websiteUrl"
              placeholder="Enter URL"
              onChange={(e) => setUrl(e.target.value)}
            />
            <small id="urlHelp" class="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <button
            type="submit"
            class="btn btn-primary"
            onClick={(e) => {
              callApi(e);
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
