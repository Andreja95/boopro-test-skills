

export const movieSliderByGenre = ({genre, movie, movieByGenreList, firstMovie, lastMovie}) => {
    const minIndexMovie = 0;
    const maxIndexMovie = movieByGenreList.length;
   
    //console.log(movieByGenreList);
    console.log(firstMovie);
    console.log(lastMovie);
    console.log(maxIndexMovie);
    return (
        <div className = "movieSliderByGenre">
          
            <h3>{genre}</h3>
            <h3>{movie}</h3>  
                {/* {Object.keys(movieByGenreList).map(function(key) {
                    return (
                    <h3 key={key} style={{color:"green"}}>{key.id}</h3>
                    )
                })}; */}

                    {/* {moviesByGenre.list.map((image, index2) => {
                        return (
                        // <Carousel.Item>
                        <div key={index2}>
                        <span style={{color:'white'}}>{index2}</span>
                        </div>
                        // </Carousel.Item>
                        );
                    })} */}
        </div>
    )
}

export default movieSliderByGenre;