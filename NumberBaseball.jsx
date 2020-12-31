import React, { Component } from "react";
import Try from "./Try";

function getNumbers() {
  //
  const candidata = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];

  for (let i = 0; i < 4; i += 1) {
    const chosen = candidata.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
}

class NumberBaseball extends Component {
  state = {
    result: "",
    value: "",
    answer: getNumbers(),
    trise: [],
  };

  numberList = [1, 2, 3, 4, 5];

  onSubmitForm = (e) => {
    e.preventDefault();

    if (this.state.value.length < 4) {
      alert("4자리를 입력해주세요");
      this.setState({
        value: "",
      });
      return;
    }

    if (this.state.value === this.state.answer.join("")) {
      this.setState({
        result: "",
        value: "",
        answer: getNumbers(),
        trise: [],
      });
      alert("홈런 게임을 다시 시작합니다.");
    } else {
      const answerArray = this.state.value.split("").map((v) => parseInt(v));

      let strike = 0;
      let ball = 0;

      if (this.state.trise.length >= 9) {
        this.setState({
          result: `10 번 넘게 틀려서 실패! 답은${this.state.answer.join(
            ","
          )}였습니다.`,
        });
        alert("게임을 다시 시작합니다.");
        this.setState({
          value: "",
          answer: getNumbers(),
          trise: [],
        });
      } else {
        for (let i = 0; i < 4; i += 1) {
          if (answerArray[i] === this.state.answer[i]) {
            strike += 1;
          } else if (this.state.answer.includes(answerArray[i])) {
            ball += 1;
          }
        }

        this.setState({
          trise: [
            ...this.state.trise,
            {
              try: this.state.value,
              result: `${strike} 스트라이크, ${ball} 볼입니다.`,
              value: "",
            },
          ],
        });
      }
    }
  };

  onChangeInput = (e) => {
    //
    console.log(this.state.answer);
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    return (
      <>
        <h1>{this.state.result}</h1>
        <form onSubmit={this.onSubmitForm}>
          <input
            maxLength={4}
            value={this.state.value}
            onChange={this.onChangeInput}
          />
        </form>
        <div>시도: {this.state.trise.length}</div>
        <ul>
          {this.state.trise.map((v, i) => (
            <Try key={`${i + 1}차 시도 :`} tryInfo={v} />
          ))}
        </ul>
      </>
    );
  }
}

export default NumberBaseball;
