import React, { createContext, useEffect, useState } from 'react';

//import data
import { housesData } from '../data'
import { parse } from 'postcss';

export const HouseContext = createContext();

const HouseContextProvider = ({ children }) => {
  const [houses, setHouses] = useState(housesData);
  const [country, setCountry] = useState('Location (any)');
  const [countries, setCountries] = useState([]);
  const [property, setProperty] = useState('Property type (any) ');
  const [properties, setProperties] = useState([])
  const [price, setPrice] = useState('Price range (any)');
  const [loading, setLoading] = useState(false);


  // return all countries
  useEffect(() => {
    const allCountries = houses.map((house) => {
      return house.country;
    })
    const uniqueCountries = ['Location (any)', ...new Set(allCountries)]

    setCountries(uniqueCountries)
  }, [])
  // return all properties
  useEffect(() => {
    const allProperties = houses.map((house) => {
      return house.type;
    })
    const uniqueProperites = ['Property type (any) ', ...new Set(allProperties)]
    setProperties(uniqueProperites);
  }, [])
  //handle click

  const handleClick = () => {
    setLoading(true)

    const isDefault = (str) => {
      return str.split(' ').includes('(any)');
    };
    const minPrice = parseInt(price.split(' ')[0]);
    const maxPrice = parseInt(price.split(' ')[2]);

    console.log(minPrice, maxPrice)

    const newHouses = housesData.filter((house)=> {
      const housePrice = parseInt(house.price);
      
      // if all selected
      if (house.country === country && house.type === property && housePrice >= minPrice && housePrice <= maxPrice) {
        console.log(house)
        return house;
      }
      // if all  default are selected
      if (isDefault(country) && isDefault(property) && isDefault(price)) {
        return house;
      }

      // if country is not default 
      if (!isDefault(country) &&  isDefault(property) && isDefault(price) ){
        return house.country === country;
      }

      // if property is not default
      if(!isDefault(property) && isDefault(country) && isDefault(price)){
        return house.type === property;
      }

      // if price is not default
      if(!isDefault(price) && isDefault(country) && isDefault(property)){
        if(house.price >= minPrice && house.price < maxPrice){
          return house
        }
        
      }
      
    })

    setTimeout(() => {
      return(
        newHouses.length < 1 ? setHouses([]) : setHouses(newHouses), setLoading(false)
      )
    }, 1000);
    






  }


  return (
    <HouseContext.Provider value={
      {
        country,
        setCountry,
        countries,
        setCountries,
        properties,
        setProperties,
        property,
        setProperty,
        price,
        setPrice,
        houses,
        setHouses,
        loading,
        setLoading,
        handleClick
      }
    }>
      {children}
    </HouseContext.Provider>
  )
};

export default HouseContextProvider;
