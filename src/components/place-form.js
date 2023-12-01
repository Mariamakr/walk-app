import React, {useEffect, useState} from 'react';
import {API} from '../api-service';
import { useCookies } from 'react-cookie';

function PlaceForm(props) {

    const [location, setLocation] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [token] = useCookies(['the-token']);

    // This is a hook i use to change the content of inputs every time i click the edit button
    useEffect(()=> {
        setLocation(props.place.location);
        setCity(props.place.city);
        setCountry(props.place.country);

    }, [props.place])

    const updateClicked = () => {
        //console.log('update here');
        API.updatePlace(props.place.id, {location:location, citi:city, country:country}, token['the-token'])
        .then(resp => props.updatedPlace(resp))
        .catch(error => console.log(error))
    }
    const createClicked = () =>{
        //console.log('create here')
        API.createPlace({country,location,city}, token['the-token'])
        .then((resp) => props.newPlaceCreated(resp))
        
        .catch (error => console.log(error))
    }

    const isDisabled = location.length === 0 || city.length === 0 || country.length === 0

    return (
        <React.Fragment>
            {props.place ? (
                <div>
                    <label htmlFor='location'>Location</label><br/>
                    <input id="location" type="text" placeholder='Location'
                    value={location} onChange={ eve => setLocation(eve.target.value)}></input><br/>
                    <label htmlFor='city'>City</label><br/>
                    <input id="city" type="text" placeholder='City'
                    value={city} onChange={eve => setCity(eve.target.value)}></input><br/>
                    <label htmlFor='country'>Country</label><br/>
                    <input id="country" type="text" placeholder='Country'
                    value={country} onChange={eve => setCountry(eve.target.value)}></input><br/>
                    { props.place.id 
                        ?                     
                        <button onClick={updateClicked} disabled={isDisabled}>Update</button>
                        :
                        <button onClick={createClicked} disabled={isDisabled}>Create</button>

                    }
                </div>
            ): null }
        </React.Fragment>
    )
}

export default PlaceForm;