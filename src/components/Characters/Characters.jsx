import { useEffect, useState } from 'react';
import './characters.scss';
import { Link } from 'react-router-dom';

function Characters({ searchQuery }) {
    const [characters, setCharacters] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const pagesToShow = 10;
    const [startPage, setStartPage] = useState(1);

    const fetchCharactersData = () => {
        let url = `https://rickandmortyapi.com/api/character?page=${currentPage}`;
        if (searchQuery) {
            url += `&name=${encodeURIComponent(searchQuery)}`;
        }

        fetch(url)
            .then(response => response.json())
            .then(data => {
                setCharacters(data.results || []);
                setTotalPages(data.info.pages);
            });
    }

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
            if (newPage < startPage) {
                setStartPage(Math.max(startPage - pagesToShow, 1));
            } else if (newPage >= startPage + pagesToShow) {
                setStartPage(startPage + pagesToShow);
            }
        }
    }

    const renderPagination = () => {
        let buttons = [];
        const endPage = Math.min(startPage + pagesToShow - 1, totalPages);

        for (let i = startPage; i <= endPage; i++) {
            buttons.push(
                <li key={i}>
                    <a href="#" className={currentPage === i ? 'active' : ''} onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(i);
                    }}>
                        {i}
                    </a>
                </li>
            );
        }

        return (
            <ul id="pagination">
                <li>
                    <a href="#" onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(currentPage - 1);
                    }}>
                        «
                    </a>
                </li>
                {buttons}
                <li>
                    <a href="#" onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(currentPage + 1);
                    }}>
                        »
                    </a>
                </li>
            </ul>
        );
    }

    useEffect(() => {
        fetchCharactersData();
    }, [searchQuery, currentPage]);

    return (
        <div className='characters-container'>
            {characters.length > 0 ? (
                characters.map(character => (
                    <section key={character.id} className='characters-section'>
                        <Link to={`/character/${character.id}`} className="image-container">
                            <img src={character.image} className='characters-photo' />
                            <div className="hover-text"></div>
                        </Link>
                        <div className='characters-name'>{character.name}</div>
                    </section>
                ))
            ) : (
                <div className='no-results'>Aucun personnage trouvé.</div>
            )}
            {renderPagination()}
        </div>
    )
}

export default Characters;
