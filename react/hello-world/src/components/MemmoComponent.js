import React from 'react'

function MemmoComponent({name}) {
    console.log('MemmoComponent render')
  return (
    <div>{name}</div>
  )
}

export default React.memo(MemmoComponent)