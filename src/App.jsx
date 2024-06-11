
import { useEffect, useRef, useState } from 'react';
import './App.css'
import useFetch from './hoods/useFetch';
import LocationCard from './components/LocationCard';
import ResidentCard from './components/ResidentCards';


function App() {
  
  const randomId = Math.floor(Math.random() * 126) + 1;
  const [inputValue, setInputValue] = useState(randomId);
  const [location, getLocation, isLoading, hasError] = useFetch();
  

  useEffect(() => {
    const url = `https://rickandmortyapi.com/api/location/${inputValue}`;
    getLocation(url);
  }, [inputValue])

  const textInput = useRef();
  // para ejecutar el formulario creamos un handleSubmit
  const handleSubmit = (event) => {
    event.preventDefault();
    setInputValue(textInput.current.value.trim().toLowerCase());
    textInput.current.value='';
  }

  console.log(inputValue);

  return (
    <div className='app'>
      {
        isLoading ? 
        <h2>Loading....</h2>
        :
        <>
          <div className='banner'>
            <img src='https://www.shutterstock.com/image-vector/pixel-art-design-outdoor-landscape-600nw-1715459347.jpg' alt='character image' />
          </div> 
          <h1 className='app__title'>Rick and morty</h1>
          <form className='app__form' onSubmit={handleSubmit}>
            <input className='app__form-input' ref={textInput} type="number"/>
            <button className='app__form-btn'>Search</button>
          </form>
          {
            hasError ?
            <h2>❌ Hey! you must provide an id from 1 to 126😢</h2>
            :
            <>
              <LocationCard
              info= {location}
              />
              <div className='app__container'>
                {
                  location?.residents.map((character) => (
                    <ResidentCard
                    key = {character}
                    info= {character}
                    />
                  ))
                }   
              </div>  
            </>
          }
          
        </>
      }
      
    </div>
  )
}

export default App
