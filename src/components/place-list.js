import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit} from '@fortawesome/free-solid-svg-icons';
import { faTrash} from '@fortawesome/free-solid-svg-icons';
import {API} from '../api-service';
import { useCookies } from 'react-cookie';

function PlaceList(props){

    const [token] = useCookies(['the-token']);

    const placeClicked = place => eve => {
        props.placeClicked(place)
    }

    const editClicked = place => {
        props.editClicked(place);
    }

    const removeClicked = place =>{
        API.deletePlace(place.id, token['the-token'])
        .then(()=> props.removeClicked(place))
        .catch(error => console.log())
    }

    return (
        <div>
            {/* how we see the blocks of places is this list looping the data we have (the inserted data from django /admin ) */}
            {props.places && props.places.map(place  =>  {
                return (
                <div className='list' key={place.id}>
                    <h2 onClick={placeClicked(place)}>{place.location}</h2>
                    <h6 onClick={placeClicked(place)}>{place.city},{place.country}</h6>
                    <FontAwesomeIcon icon={faEdit} onClick={() => editClicked(place)} />
                    <FontAwesomeIcon icon={faTrash} onClick={() => removeClicked(place)}/>

                </div>
                );
        })}
        </div>
    );
}

export default  PlaceList;