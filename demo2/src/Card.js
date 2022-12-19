import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"

const Card = () => {
  return (
    <div className="card" style={{ width: "18rem"}}>
      <div className="card-body">
        <p className="card-text">
            Some quick example text to build on 
        </p>
        <a href="#" className="btn btn-primary">
            {" "}
            Go someewhere {" "}
        </a>
      </div>
    </div>
  )
}

export default Card
