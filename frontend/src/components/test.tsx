"use client"

import Modal from "@/components/modal/modal";
import {useState} from "react";

export default function Test() {
    const [isOpen, setIsOpen] = useState(false);
    const [modalFormResult, setModalFormResult] = useState<FormData | undefined>();

    function openModal() {
        setIsOpen(true)
    }

    function handleFormData(formData: FormData) {
        setModalFormResult(formData)
    }

    return (
        <>
            <button className="button-green" onClick={openModal}>asd</button>
            {isOpen &&
                <Modal>
                    <form action={handleFormData}>
                        <label>Значение 1</label>
                        <input className="input-green" type="text" name="prop"/>
                        <label>Значение 2</label>
                        <input className="input-green" type="text" name="prop"/>
                        <label>Значение 3</label>
                        <input className="input-green" type="text" name="prop"/>
                        <button className="button-green" type="submit">Подтвердить</button>
                    </form>
                </Modal>
            }
            {modalFormResult && <p>Значения из формы: {modalFormResult.getAll("prop").toString()}</p>}
        </>
    );
}
