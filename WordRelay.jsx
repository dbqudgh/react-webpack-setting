const React = require("react");
const { useState, useRef } = React;

function getRandomValueZero() {
  return Math.floor(Math.random() * 4);
}

const WordRelay = () => {
  const stringArray = [
    "안녕하세요 반갑습니다.",
    "안녕하세요 반갑지 않습니다.",
    "오늘하루 좋은하루 보내셨는지요",
  ];

  const randomValue = Math.floor(Math.random() * 4);

  const [word, setWord] = useState(stringArray[randomValue]);
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const inputRef = useRef(null);

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (word === value) {
      setResult("딩동댕");
      setWord(stringArray[randomValue]);
      setValue("");
    } else {
      setResult("땡");
      setValue("");
    }
    inputRef.current.focus();
  };

  const onChangeInput = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <div>{word}</div>
      <form onSubmit={onSubmitForm}>
        <input ref={inputRef} value={value} onChange={onChangeInput} />
      </form>
      <div>{result}</div>
    </>
  );
};

module.exports = WordRelay;
