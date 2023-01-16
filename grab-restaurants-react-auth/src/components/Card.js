import React from 'react'
import {Link} from 'react-router-dom'

const Card = ({restaurant, handleDelete}) => {
  return(
              <div className='card' style={{ width: "18rem "}} key={restaurant.id}>
                <img src={restaurant.imageurl} className='card-img-top' alt=''/>
                <div className='card-body'>
                  <h5 className='title'>{restaurant.name}</h5>
                  <p className='card-text'>{restaurant.type}</p>
                  <Link to="" className="btn btn-danger px-2" onClick={() => handleDelete(restaurant.id)}>
                    Delete
                  </Link>
                  <Link to={"/update/" + restaurant.id}
                  className="btn btn-warning px-2">
                    edit
                  </Link>
                  </div>
                  </div> 
            )
}

export default Card