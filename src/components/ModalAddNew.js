import { useState } from "react"
import { postCreateUser } from "../services/UserService"
import { toast } from 'react-toastify';


const { Modal, Button, Form } = require("react-bootstrap")

const ModalAddNew = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { handleClose, show, titleModal } = props

    const handleOnSave = async () => {
        let res = await postCreateUser(email, password)
        console.log(res);
        if (res && res.data && res.data.id) {
            handleClose()
            setEmail("")
            setPassword("")
            toast.success("Create User Succeed")
        } else {
            toast.error("Error")
        }
    }


    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{titleModal}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="body-add-new">
                        <div>
                            <Form.Group className="mb-3">
                                <Form.Label>email</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>password</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                            </Form.Group>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleOnSave}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalAddNew