import styles from '../../styles/components/MovieSliderByGenre.module.css';
import ImageModal from '../ImageModal/ImageModal';

export const movieSliderByGenre = ({
    movie,
    movieByGenreList,
    isCurrent,
    position,
    darkMode,
}) => {
    var minDisplayedMovie = position.minDisplayedMovie;
    var maxDisplayedMovie = position.maxDisplayedMovie;
    var currentMovie = false;

    return (
        <div className='movieSliderByGenre row'>
            {movieByGenreList.map((image, index) => {
                if (index >= minDisplayedMovie && index <= maxDisplayedMovie) {
                    if (movie === index && isCurrent) {
                        currentMovie = true;
                    } else {
                        currentMovie = false;
                    }
                    return (
                        <div
                            className='item col-2 px-0 mx-0 text-center'
                            key={index}>
                            <div
                                className={` ${
                                    currentMovie ? styles.currentItem : null
                                }`}>
                                <img
                                    className='img-responsive'
                                    draggable={false}
                                    src={
                                        'https://image.tmdb.org/t/p/w500//' +
                                        image.poster_path
                                    }
                                />
                            </div>
                            <p
                                className={`${
                                    currentMovie ? null : styles.currentTitle
                                }`}>
                                {image.title}
                            </p>
                            {(() => {
                                if (darkMode && currentMovie) {
                                    return (
                                        <ImageModal
                                            image={JSON.stringify(
                                                image.poster_path
                                            )}
                                            imageTitle={image.title}
                                            overview={image.overview}
                                            vote_average={image.vote_average}
                                        />
                                    );
                                }
                            })()}
                        </div>
                    );
                }
            })}
        </div>
    );
};

export default movieSliderByGenre;
