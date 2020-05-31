import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './photos-modal.css';
import { Photo } from '../../pages/events/events-page';

//Photos Modal Props interface declaration
interface PhotosModalProps {
    closeModal: any,
    photos: Photo[],
    index: number
}

const PhotosModal = ({ closeModal, photos, index }: PhotosModalProps) => {
    // set current photo index
    const [photoIndex, setPhotoIndex] = useState<number>(index);

    // get index from selected thumbnail
    useEffect(() => {
        setPhotoIndex(index);
    }, [index]);

    const el = document.getElementById('modal-root');

    if (!el) return null;

    // display previous photo
    const previousPhoto = () => {
        if (photoIndex - 1 >= 0) {
            setPhotoIndex(photoIndex - 1);
        }
    }

    // display next photo
    const nextPhoto = () => {
        if (photoIndex + 1 < photos.length) {
            setPhotoIndex(photoIndex + 1);
        }
    }

    return createPortal(
        <div className="photos-viewer-wrapper">
            <div className="previous-button">
                <button onClick={() => previousPhoto()}>Previous</button>
            </div>
            <div className="show-photo-wrapper" onClick={closeModal}>
                <img src={`http://localhost:8080/static/photos/${photos[photoIndex].path}`} className="photo" />
            </div>
            <div className="next-button">
                <button onClick={() => nextPhoto()}>Next</button>
            </div>
        </div>, el
    )
}

export default PhotosModal;