import React, { useState, useEffect } from "react";
import axios from "axios";

const Summary = () => {
  useEffect(() => {
    getSummary( true);
    // getAllSentences();
  }, []);

  const [paragraph, setParagraph] = useState("");
  async function getSummary(update) {
    axios
      .get(
        "http://localhost:8000/api/summary/" +
          String(localStorage.getItem("objectId"))
      )
      .then((resp) => {
        console.log(resp.data.paragraph);
        setParagraph(resp.data.paragraph);
        if(update)
          setSentences(resp.data.sentence);
      })
      .catch((error) => {
        console.error(error.response);
      });
  }

  const [sentences, setSentences] = useState([

  ]);
  async function getAllSentences() {
    axios
      .get(
        "http://localhost:8000/api/getAllSentences/" +
          String(localStorage.getItem("objectId"))
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

  const [selectedCount, setSelectedCount] = useState([0]);
  function handleChange(sentence, i, e) {
    // console.log(sentences.find(x => x.id === sentence.id))

    if (0) {
      alert("You cannot select more than 10 sentences");
    } else {
      if (sentences[i].selected) {
        e.target.parentNode.parentNode.parentNode.children[1].style.background =
          "#FFB5B5";
        e.target.parentNode.parentNode.parentNode.children[1].style.borderRadius =
          "25px";
      } else {
        e.target.parentNode.parentNode.parentNode.children[1].style.background =
          "#E8F3D6";
        e.target.parentNode.parentNode.parentNode.children[1].style.borderRadius =
          "25px";
      }

      const items = [...sentences];
      items[i].selected = !items[i].selected;
      setSentences(items);
      let current_count = items.filter((x) => x.selected === true).length;
      setSelectedCount((prev) => current_count);
      axios
        .get(
          "http://localhost:8000/api/updateSelectedSentence/" +
            String(sentence.sentenceId)
        )
        .then((resp) => {
          console.log(resp.data);
        })
        .catch((error) => {
          console.error(error.response);
        });
        getSummary( false)
    }
  }

  return (
    <div className="p-5">
      <div className="row">
        <div className="col">
          <h2>TranScript Summary</h2>
          <div className="card">
            <div className="card-body">
              <p className="card-text">{paragraph}</p>
            </div>
          </div>
        </div>
        <div className="col mt-2">
            <h2>Sentences</h2>
        <table className="table table-borderless">
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
        </table>
        </div>
      </div>
    </div>
  );
};

export default Summary;
