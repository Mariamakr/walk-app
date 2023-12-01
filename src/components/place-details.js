import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar} from '@fortawesome/free-solid-svg-icons';
import { useCookies } from 'react-cookie';

function PlaceDetails(props){

    const [highlighted, setHighlighted] = useState(-1);
    const [token] = useCookies(['the-token']);

    let pl = props.place;

    const highlightRate = high => eve => {
        setHighlighted(high);
    }

    // Send the data for a new rating to a place
    const rateClicked = rate => eve => {
        fetch(`http://127.0.0.1:8000/api/places/${pl.id}/rate_place/` , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token['the-token']}`
            },
            body: JSON.stringify({stars: rate + 1})
        })
        .then(() => getDetails())
        .catch(error => console.log(error))
    }

    // get the data for a specific place when an item from the list is clicked
    const getDetails = () =>{
        fetch(`http://127.0.0.1:8000/api/places/${pl.id}/` , {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token['the-token']}`
            }
        })
        .then(resp => resp.json())
        .then( resp => props.updatePlace(resp))
        .catch(error => console.log(error))
    }


    return (
        <React.Fragment>
            {pl ? (
                <div>
                    {/* displaying  the average rating of the Place */}
                    <h1>{pl && pl.city}</h1>
                    <p>{pl && pl.location}</p>
                    <FontAwesomeIcon icon={faStar} className={pl.avg_rating > 0 ? 'orange' : ''}/>
                    <FontAwesomeIcon icon={faStar} className={pl.avg_rating > 1 ? 'orange' : ''}/>
                    <FontAwesomeIcon icon={faStar} className={pl.avg_rating > 2 ? 'orange' : ''}/>
                    <FontAwesomeIcon icon={faStar} className={pl.avg_rating > 3 ? 'orange' : ''}/>
                    <FontAwesomeIcon icon={faStar} className={pl.avg_rating > 4 ? 'orange' : ''}/>
                    ({pl.number_of_ratings})
                
                {/* functionality for rate now -stars */}
                    <div className='rate-container'>
                        <h2>Rate it</h2>
                        {[...Array(5)].map( (e, i) =>{
                            return <FontAwesomeIcon key={i} icon={faStar} className={highlighted > i -1  ? 'brown' : ''}
                            onMouseEnter={highlightRate(i)}
                            onMouseLeave={highlightRate(-1)}
                            onClick={rateClicked(i)}
                            />

                        })}
                    </div>
                </div>
                
            ) : null }
        </React.Fragment>
        
    )
}

export default  PlaceDetails;