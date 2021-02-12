import Modal from 'react-bootstrap/Modal';

export const imageModal = ({image, imageTitle, overview, vote_average}) => {
    var imgPath = image.slice(1, -1);

    return (
        <Modal
            show={true}
            dialogClassName='modal-90w'
            aria-labelledby='example-custom-modal-styling-title'>
            <Modal.Header closeButton>
                <Modal.Title id='example-custom-modal-styling-title'>
                    Custom Modal Styling
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <img
                    style={{width: '100%'}}
                    className='img-responsive'
                    draggable={false}
                    src={'https://image.tmdb.org/t/p/w500//' + imgPath}
                />
            </Modal.Body>
            <Modal.Footer className='text-center'>
                <div className='row'>
                    <div className='col-12'>
                        <h4>{imageTitle}</h4>
                    </div>
                    <div className='col-12'>
                        {' '}
                        <h5>overview: {overview}</h5>
                    </div>
                    <div className='col-12'>
                        <h6>vote_average: {vote_average}</h6>
                    </div>
                </div>
            </Modal.Footer>
        </Modal>
    );
};

export default imageModal;
