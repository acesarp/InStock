import React, { Fragment } from "react";
function Input(props) {
  return (
    <Fragment>
      <input
        className={props.className}
        type="text"
        placeholder={props.placeholder}
      />
    </Fragment>
  );
}
export default Input;
