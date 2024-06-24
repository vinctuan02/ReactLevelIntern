import { useState } from "react"
import { postCreateUser } from "../services/UserService"
import { ToastContainer, toast } from 'react-toastify';


const { Modal, Button, Form } = require("react-bootstrap")

const ModalAddNew = (props) => {
    const [name, setName] = useState("")
    const [job, setJob] = useState("")

    const { handleClose, show } = props

    const handleOnSave = async () => {
        let res = await postCreateUser(name, job)
        console.log(res);
        if (res && res.id) {
            handleClose()
            setName("")
            setJob("")
            toast.success("Create User Succeed")
        } else {
            toast.error("Error")
        }
    }


    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="body-add-new">
                        <div>
                            <Form.Group className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text" placeholder="Enter name"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Job</Form.Label>
                                <Form.Control
                                    type="text" placeholder="Job"
                                    value={job}
                                    onChange={(event) => setJob(event.target.value)}
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