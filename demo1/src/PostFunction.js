import React from 'react'

export const PostFunction = (props) => { 
   
   
  return (
    <div>
      <p> 
        <b> Text: </b> <i> {props.content} </i>
        </p>
        <p>
            <b> Text: </b> <i> {props.name} </i>
        </p>
    </div>
  )
}

export default PostFunction



