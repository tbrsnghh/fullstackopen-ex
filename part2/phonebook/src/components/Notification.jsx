import React from 'react'

export default function Notification({ status, message }) {
    const style = {
		background: "white",
		fontSize: "16px",
		borderStyle: "solid",
		borderRadius: "5px",
		padding: "10px",
		marginBottom: "10px",
	};
  if (status === "success") {
    style.color = "green";
  } else if (status === "error") {
    style.color = "red";
  }
  return (
    <div style={style}>{message}</div>
  );
}
