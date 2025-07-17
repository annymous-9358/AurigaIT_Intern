import React from 'react'

function HookCounter() {
    const [count, setCount] = React.useState(0);
   
  return (

    <div>
       <button onClick={() => setCount(count + 1)}>Click Me {count}</button>
    </div>
  )
}

export default HookCounter