import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Home = () => {
  let navigate = useNavigate();
  //   const [urlName, setUrlName] = useState("");
  const [url, setUrl] = useState("");
  const [file, setFile] = useState("");

  useEffect(() => {
    console.log(file)
  }, [file])
  
  // async function handleSubmit(event){
  //   const response = await fetch(`http://localhost:8000/api/uploadPdf/`,{
  //     method: "POST",
  //    headers: {
  //      "Content-Type": "multipart/form-data"
  //     },
      
  //     body:JSON.stringify({
  //       file:file,
  //   })
  //   })

  //   let data = await response.json()
  //   console.log(data)
  // }
  
  function handleSubmit(event) {
    event.preventDefault()
    axios
      .post("http://localhost:8000/api/uploadPdf/", 
      {
        file: file,
      },
      {
        headers: {
        'content-type': 'multipart/form-data',
        
        }
      }
      )
      .then((resp) => {
        console.log(resp.data);
        localStorage.setItem("objectId", resp.data.objectId);
        navigate("/sentences");
      })
      .catch((error) => {
        console.error(error.response);
      });

  }


  useNavigate();

  function handleFileChange(e){
    let x = e.target.files[0]
    setFile(x)
  }

  async function callApi(e) {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/uploadUrl/", {
        // urlName: urlName,
        url: url,
      })
      .then((resp) => {
        console.log(resp.data);
        localStorage.setItem("objectId", resp.data.objectId);
        navigate("/sentences");
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
            <br />
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
        <br/>
        <form onSubmit={handleSubmit} enctype="multipart/form-data">
        <label >Choose Pdf to upload</label><br/>
          <input name="dinoPdf" id ="dinoPdf" type="file" onChange={(e) => handleFileChange(e)} /><br/>
          <button type="submit" class="btn btn-primary mt-3" onClick={(e) => {
              handleSubmit(e);
            }}>Upload</button>
        </form>
      </div>
    </div>
  );
};

export default Home;
