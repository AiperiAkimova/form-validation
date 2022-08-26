import { useReducer, useState } from "react";
//reducer functions

const inputReducer = (prevState, action) => {
  //1
  if (action.type === "FIRSTNAME") {
    return {
      ...prevState,
      firstName: action.firstName,
    };
  }
  if (action.type === "FNAME_BLUR") {
    return {
      ...prevState,
      firstNameValidation:
        /^[A-Z][a-z]*(?: [A-Z][a-z]*)*$/.test(prevState.firstName) &&
        prevState.firstName.trim() !== "",
    };
  }

  //2
  if (action.type === "LASTNAME") {
    return {
      ...prevState,
      lastName: action.lastName,
    };
  }
  if (action.type === "LNAME_BLUR") {
    return {
      ...prevState,
      lastNameValidation:
        /^[A-Z][a-z]*(?: [A-Z][a-z]*)*$/.test(prevState.lastName) &&
        prevState.lastName.trim() !== "",
    };
  }

  //3
  if (action.type === "EMAIL") {
    return {
      ...prevState,
      email: action.email,
    };
  }
  if (action.type === "EMAIL_BLUR") {
    return {
      ...prevState,
      emailValidation:
        /^[a-z0-9.]{1,64}@[a-z0-9.]{1,64}$/i.test(prevState.email) &&
        prevState.email.trim() !== "",
    };
  }

  return prevState;
};

const BasicForm = () => {
  const [isTouched, setTouched] = useState(false);
  const [state, dispatch] = useReducer(inputReducer, {
    firstName: "",
    firstNameValidation: true,
    lastName: "",
    lastNameValidation: true,
    email: "",
    emailValidation: true,
  });

  const firsNameChangeHandler = (e) => {
    dispatch({ type: "FIRSTNAME", firstName: e.target.value });
    setTouched(true);
  };
  const validateFirstNameBlur = () => {
    dispatch({ type: "FNAME_BLUR" });
    setTouched(true);
  };

  const lastNameChangeHandler = (e) => {
    dispatch({ type: "LASTNAME", lastName: e.target.value });
    setTouched(true);
  };
  const validateLastNameBlur = () => {
    dispatch({ type: "LNAME_BLUR" });
    setTouched(true);
  };

  const emailChangeHandler = (e) => {
    dispatch({ type: "EMAIL", email: e.target.value });
    setTouched(true);
  };
  const validateEmailBlur = () => {
    dispatch({ type: "EMAIL_BLUR" });
    setTouched(true);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("Send to server");
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="form-control">
        <div
          className={
            state.firstNameValidation === false
              ? "form-control invalid"
              : "form-control"
          }
        >
          <label htmlFor="name">First Name</label>
          <input
            value={state.firstName}
            onChange={firsNameChangeHandler}
            onBlur={validateFirstNameBlur}
            type="text"
            id="name"
          />
          {!state.firstNameValidation && (
            <p>
              First name must start with a capital letter, no numbers and no spaces.
            </p>
          )}
        </div>
        <div
          className={
            state.lastNameValidation === false
              ? "form-control invalid"
              : "form-control"
          }
        >
          <label htmlFor="name">Last Name</label>
          <input
            value={state.lastName}
            onChange={lastNameChangeHandler}
            onBlur={validateLastNameBlur}
            type="text"
            id="name"
          />
          {!state.lastNameValidation && (
            <p>
              Last name must start with a capital letter, no numbers and no spaces.
            </p>
          )}
        </div>

        <div
          className={
            !state.emailValidation ? "form-control invalid" : "form-control"
          }
        >
          <label htmlFor="email">E-Mail Address</label>
          <input
            value={state.email}
            onChange={emailChangeHandler}
            onBlur={validateEmailBlur}
            type="email"
            id="email"
          />
          {!state.emailValidation && (
            <p>
              Email must include @ and can't be empty
            </p>
          )}
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" disabled={!isTouched}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default BasicForm;
