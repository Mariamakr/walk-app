import './App.css';
import React, {useState, useEffect} from 'react';
import PlaceList from './components/place-list';
import PlaceDetails from './components/place-details';
import PlaceForm from './components/place-form';
import { useCookies } from 'react-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlaneArrival} from '@fortawesome/free-solid-svg-icons';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import ErrorBoundary  from './ErrorBoundary';

function App() {

  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [editedPlace, setEditedPlace] = useState(null);

  const [token, setToken, removeToken] = useCookies(['the-token']);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/places/" , {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token['the-token']}`
      }
    })
    .then(resp => resp.json())
    .then( resp => setPlaces(resp))
    .catch(error => console.log(error))
  }, [token])

  useEffect(() => {
    //console.log(token);
    if(!token['the-token']) window.location.href = '/';

  }, [token])
  
  const placeClicked = place =>{
    setSelectedPlace(place);
    setEditedPlace(null);

  }

  const loadPlace = place =>{
    setSelectedPlace(place);
    setEditedPlace(null);
  }

  const editClicked = place =>{
    setEditedPlace(place);
    setSelectedPlace(null);
  }

  const updatedPlace = place =>{
    const newPlaces = places.map(pl => {
      if (pl.id === place.id) {
        return place;
      }
      return pl;
    })
    setPlaces(newPlaces);
  }

  const newPlace = () =>{
    setEditedPlace({location:'', city:'', country:''});
    setSelectedPlace(null);
  }

  const newPlaceCreated = place =>{
    const newPlaces = [...places, place];
    setPlaces(newPlaces);
  }

  const removeClicked =place =>{
    const newPlaces = places.filter(pl => {
      if(pl.id === place.id ){
        return false;
      }
      return true;
    })
    setPlaces(newPlaces);
  }

  const logoutUser = () => {
    removeToken(['the-token']);
  }



  return (
    <ErrorBoundary fallback={<p>Something went wrong</p>}>

      <div className="App">
        <header className="App-header">
        <h1>
          <FontAwesomeIcon icon={faPlaneArrival}></FontAwesomeIcon>
          <span>W</span>alk <span>A</span>pp
        </h1>
        <FontAwesomeIcon icon={faSignOut} onClick={logoutUser}></FontAwesomeIcon>

        </header>
        <div className='layout'>
          <div>
            <PlaceList 
              places={places} 
              placeClicked={placeClicked} 
              editClicked={editClicked}
              removeClicked={removeClicked}/>
            <button className='add-place' onClick={newPlace}>Add your favourite place!</button>
          </div>
          <PlaceDetails place={selectedPlace} updatePlace={loadPlace}/>
          { editedPlace ? <PlaceForm place={editedPlace} updatedPlace={updatedPlace} newPlaceCreated={newPlaceCreated}/> : null}
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;
