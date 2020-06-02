import React, { useState } from "react";
import PhotosModal from "../../components/photos-modal/photos-modal";
import { Photo } from "../models";

// Photos Modal Props interface declaration
interface PhotosModalProps {
    photos: Photo[],
    index: number,
}

// custom hook to render photos in a modal
export const usePhotosModal = () => {
    // toggle show/hide modal
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const show = (): void => setIsVisible(true);
    const hide = (): void => setIsVisible(false);


    const RenderPhotosModal = ({ photos, index }: PhotosModalProps) => (
        <React.Fragment>
            {isVisible && < PhotosModal closeModal={hide} photos={photos} index={index} />}
        </React.Fragment>
    )

    return {
        show,
        hide,
        RenderPhotosModal,
    }
}