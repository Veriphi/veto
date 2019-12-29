import React from "react";

const apiCall = async () => await window.fetch("http://localhost:3000/start");
export default () => <button onClick={apiCall}>post to B</button>;
