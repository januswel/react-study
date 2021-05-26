import React, { useState, useEffect } from "react";

const Counter: React.VFC = () => {
  const [state, setState] = useState(0);
  useEffect(() => {
    document.title = state.toString();
  });

  return (
    <div>
      <p>{state}</p>
      <button onClick={decrement}> - </button>
      <button onClick={increment}> + </button>
    </div>
  );

  function decrement() {
    setState(state - 1);
  }

  function increment() {
    setState(state + 1);
  }
};

export default Counter;
