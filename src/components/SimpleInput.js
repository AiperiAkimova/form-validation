import { useRef, useState } from "react";

const SimpleInput = (props) => {
  const nameInputRef = useRef();
  const [isNameValid, setIsNameValid] = useState(true);
  const [isTouched, setTouched] = useState(false);
const [name, setName] = useState('')
//1
  const formSubmitHandler = (e) => {
    e.preventDefault();
    console.log("Send to server");
  };
//2
  const nameInputBlurHandler = () => {
    setIsNameValid(true);
    const eneteredValue = nameInputRef.current.value;
    if (eneteredValue.trim().length < 4) {
      setTouched(false)
      setIsNameValid(false);
      return;
    }
    setTouched(true);
  };
//3
  const nameInputChangeHandler = (e)=>{
    setName(e.target.value)
    if (e.target.value.trim().length < 4) {
      setTouched(false)
      setIsNameValid(false);
      return;
    }
    setIsNameValid(true)
    setTouched(true)
  }

  const inputClasses = isNameValid ? "form-control" : "form-control invalid";

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={inputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
        value={name}
        onChange={nameInputChangeHandler}
          ref={nameInputRef}
          onBlur={nameInputBlurHandler}
          type="text"
          id="name"
        />
        {!isNameValid && <p className="error-text">NO NO NO</p>}
      </div>
      <div className="form-actions">
        <button disabled={!isTouched}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
