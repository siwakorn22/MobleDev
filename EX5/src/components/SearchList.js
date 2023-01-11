import React from 'react'
import Card from './Card'

const SearchList = ({filteredRestarants, handleDele}) => {
    const filtered = filteredRestarants.map((restaurant) => {
        return (<Card 
        key={restaurant.id}
        restaurant={restaurant} 
        handleDelete={handleDele}
        />);
    });
  return <>{filtered}</>;

};

export default SearchList
