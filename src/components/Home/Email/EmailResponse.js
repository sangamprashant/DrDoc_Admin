import React from 'react'
import { useParams } from 'react-router-dom';

function EmailResponse(props) {
    const { type } = useParams();
    console.log()
  return (
    <div>
      {type}
    </div>
  )
}

export default EmailResponse
