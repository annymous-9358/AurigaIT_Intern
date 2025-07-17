import React, { useState, useEffect } from 'react'

function HookMouse() {
    const [x, setX] = useState(0)
    const [y, setY] = useState(0)
    const logMousePosition = e => {
        console.log('Mouse position logged');
        setX(e.clientX)
        setY(e.clientY)
    }
    useEffect(() => {
        
        console.log('useEffect called');
        window.addEventListener('mousemove', logMousePosition)

        // Cleanup function to remove the event listener
        return () => {
            console.log('Component unmounted, cleanup');
            window.removeEventListener('mousemove', logMousePosition)
        }
    }, [])
    return (
        <div>
            Mouse Position: X- {x}, Y- {y}
        </div>
    )
}

export default HookMouse