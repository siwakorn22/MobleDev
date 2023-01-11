import React,{useState, useEffect} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom'
import axios from 'axios'

const Update = () => {
  const [restaurant, setRestaurant] = useState({
    name:"",
    type:"",
    imageurl:""
  });
  const {restaurantId} = useParams()
  useEffect(()=>{
      const fetchAllRestaurant = async ()=>{
        try {
          const res = await axios.get("http://localhost:5000/apis/restaurants/" + restaurantId);
          setRestaurant(res.data)
        } catch (error){
          console.log(error);
        }
      }
      fetchAllRestaurant();
    },[])
  const navigate = useNavigate();
  const [error,setError] = useState(false);

  const handleChange = (e) =>{
    setRestaurant((prev)=>({...prev, [e.target.name]:e.target.value}));
  };

  const handleClick = async (e) =>{
    e.preventDefault();
    try {
      await axios.put("http://localhost:5000/apis/restaurants/"  + restaurantId ,restaurant);
      navigate("/")
    } catch (error) {
      console.log(error);
      setError(true)
    }
    };

  return (
    <div className='container'>
      <h1>Grab Restaurant</h1>
      <div className='row form'>
        <div className='col-6 card justify-content-center'>
          <h5 className='card-header'>update New Restaurant</h5>
          <div className='card-body'>
            <form>
              <div className='form-group'>
                <label>Restaurant Type</label>
                <input type="text" className='form-control'
                name="name" value={restaurant.name} placeholder='Restaurant Name'
                onChange={handleChange}/>
              </div>

              <div className='form-group'>
                <label>Restaurant Type</label>
                <input type="text" className='form-control'
                name="type" value={restaurant.type} placeholder='Restaurant Type'
                onChange={handleChange}/>
              </div>

              <div className='form-group'>
                <label>Restaurant Type</label>
                <input type="text" className='form-control'
                name="imageurl" value={restaurant.imageurl} placeholder='Restaurant Image'
                onChange={handleChange}/>
              </div>
              <Link to="" className="btn btn-success" onClick={handleClick}>
                Update
              </Link>
              {" "}
              <Link to="/" className="btn btn-danger">
                Cancel
              </Link>
              <div className="error">{error && "เจอ Error แล้วไอ้โง่"}</div>
            </form>
          </div>
        </div>
        </div>
      </div>
  )
}

export default Update