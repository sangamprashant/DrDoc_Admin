import React from 'react'

function Home() {
  return (
    <div>
      Home
      {process.env.REACT_APP_MY_KEY}
    </div>
  )
}

export default Home
