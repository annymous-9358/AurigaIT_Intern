import React,  {useState} from 'react'

function UseState() {
  const [count, setCount] = useState(0);
console.log("UseState component rendered with count:");

  return (
    <div>
      <button onClick={() => setCount((c) => c + 1)}>count - {count}</button>
      <button onClick={() => setCount(5)}>count - {count}</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  )
}

export default UseState 