import React, {useState, useEffect} from 'react'


function Greeting() {
    const [time, setTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        
        const interval = setInterval(() =>{
            setTime(new Date().toLocaleTimeString())
        },)
        setTime(new Date().toLocaleTimeString());

    }, [])
  return (
   <div>
    <p>current time: {time}</p>
   </div>
  )
}

export default Greeting