"use client"

import Popup from "./popup"
import { useGenericPopup } from "@/hooks/use-popup-store"

export default function GenericPopup() {
    const { isPopupOpen, popupContent, popupTitle, popupSize, closePopup } = useGenericPopup()

    if (!isPopupOpen || !popupContent) return null

    return (
        <Popup
            isOpen={isPopupOpen}
            onClose={closePopup}
            title={popupTitle || undefined}
            size={popupSize}
            closeOnOverlayClick={true}
            closeOnEscape={true}
        >
            {popupContent}
        </Popup>
    )
}
