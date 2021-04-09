import {React, Component} from "react";
import {Modal, Button, FormControl, Row, Col, InputGroup, OverlayTrigger, Tooltip, ButtonGroup} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes, faCheck} from "@fortawesome/free-solid-svg-icons";

/**
 * Form to fill out per file
 */
class CloseDrawerForm extends Component
{
    constructor(props) {
        super(props);

    }




    onClose = () =>
    {
        this.props.onClose();
    }

    render() {
        return (
            <div className="formComponent">
                <Modal show={this.props.isOpen}>
                    <form onSubmit={this.onSubmit}>
                        <Modal.Header>
                            <Modal.Title>Close Drawer?</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="form-group">
                                <p>Close drawer?</p>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="success" onClick={this.onClose}><FontAwesomeIcon icon={faCheck} /> Yes</Button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </div>
        );
    }

}

export default CloseDrawerForm;