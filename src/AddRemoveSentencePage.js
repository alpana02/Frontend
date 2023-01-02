import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddRemoveSentencePage = () => {

let navigate = useNavigate();
  

  useEffect(() => {
    getAllSentences();
  }, []);

  async function getAllSentences() {
    axios
      .get(
        "https://rajdeep345.pythonanywhere.com/api/getAllSentences/" + String(localStorage.getItem("objectId"))
      )
      .then((resp) => {
        setSentences(resp.data);
        setSelectedCount(
          (prev) => sentences.filter((x) => x.selected === true).length
        );
      })
      .catch((error) => {
        console.error(error.response);
      });
  }

  const [sentences, setSentences] = useState([
    // { id: 323232, sentenceText: "hello i am satwik", selected: false },
    // { id: 5677, sentenceText: "hello i am Alpana", selected: true },
    // { id: 543, sentenceText: "hello i am kalinga", selected: true },
    // { id: 211, sentenceText: "hello i am kj", selected: false },
    // { id: 6464, sentenceText: "hello i am dino", selected: true },
    // { id: 24646, sentenceText: "hello i am princess", selected: false },
  ]);

  const [selectedCount, setSelectedCount] = useState([0]);
  function handleChange(sentence, i, e) {
    // console.log(sentences.find(x => x.id === sentence.id))
    

    if (selectedCount >= 10 && !sentences[i].selected) {
      alert("You cannot select more than 10 sentences");
    } else {

      if(sentences[i].selected){
        e.target.parentNode.parentNode.parentNode.children[1].style.background = '#FFB5B5'
        e.target.parentNode.parentNode.parentNode.children[1].style.borderRadius = '25px'
      }
      else{
        e.target.parentNode.parentNode.parentNode.children[1].style.background = '#E8F3D6'
        e.target.parentNode.parentNode.parentNode.children[1].style.borderRadius = '25px'
      }

      const items = [...sentences];
      items[i].selected = !items[i].selected;
      setSentences(items);
      let current_count = items.filter((x) => x.selected === true).length;
      setSelectedCount((prev) => current_count);
      axios
        .get(
          "https://rajdeep345.pythonanywhere.com/api/updateSelectedSentence/" +
            String(sentence.sentenceId)
        )
        .then((resp) => {
          console.log(resp.data);
        })
        .catch((error) => {
          console.error(error.response);
        });
    }
    
  }

  function handleClick(){
  }
  return (
    <div className="container">
      <table className="table table-borderless">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Sentence</th>
            <th scope="col">-</th>
          </tr>
        </thead>
        <tbody>
          {sentences.map((sentence, i) => {
            return (
              <>
                <tr key={i}>
                  <th scope="row">{i + 1}</th>
                  <td>{sentence.sentenceText}</td>
                  <td>
                    <div class="form-check">
                      <input
                        className="form-check-input form-check"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                        onChange={(e) => {
                          handleChange(sentence, i, e);
                        }}
                        checked={sentence.selected}
                      />
                    </div>
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
      <div className="d-flex justify-content-center">
        <button className="btn btn-primary m-2" onClick={() => {navigate('/summary')}}>Next</button>
      </div>
    </div>
  );
};

export default AddRemoveSentencePage;
