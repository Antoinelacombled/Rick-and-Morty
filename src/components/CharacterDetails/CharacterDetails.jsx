import { useParams } from "react-router";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./characterdetails.scss"


function CharacterDetails() {

    const { id } = useParams();

    const [character, setCharacter] = useState([])

    const fetchCharacterData = () => {
        fetch(`https://rickandmortyapi.com/api/character/${id}`)
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log(data);
                setCharacter(data)
            })
    }

    useEffect(() => {
        fetchCharacterData()
    }, [])

    return (

        <>
            <Link to='/'>
                <button class="back-button">
                    <div class="arrow-wrap">
                        <span class="arrow-part-1"></span>
                        <span class="arrow-part-2"></span>
                        <span class="arrow-part-3"></span>
                    </div>
                </button>
            </Link>

            <div className="character-details-container">

                <section className="character-details-section">
                    <img className="character-details-image" src={character.image} />
                    <h2 className="character-details-name" >{character.name}</h2>
                </section>
                <section className="characters-section-details">
                    <div className="species">{character.species}</div>
                    <div className="status">({character.status})</div>
                </section>
                <div className="location">{character.location?.name}</div>

            </div>
        </>
    );
}

export default CharacterDetails