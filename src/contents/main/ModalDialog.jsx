import { Modal, Button } from "react-bootstrap";

const ModalDialog = (props) => {
    return (<>
        <Modal
            show={props.show}
            backdrop="static"
            keyboard={false}
            centered
        >
            <Modal.Body>
                <p role="alert">{props.message}</p>
            </Modal.Body>
            {props.onClose && 
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onClose}>
                        OK
                    </Button>
                </Modal.Footer>
            }
        </Modal>
    </>);
}

export default ModalDialog;
