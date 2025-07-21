import React, {useState, useMemo, use} from 'react'

function Counter() {
    const [count, setCounter] = useState(0)
    const increment = () =>{
        setCounter(count +1)
    }
    const isEven = useMemo(() => {
        let i = 0;
        while (i<2000000000)
            i++;
        return count %2 ===0;
    }, [count]);
  return (
    <div>
        <div>
            <button onClick={increment}>{count}</button>
        </div>
       
    </div>
  )

}

export default Counter