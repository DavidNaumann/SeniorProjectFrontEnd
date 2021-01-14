import {React, Component} from "react";
import {Modal, Button} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes} from "@fortawesome/free-solid-svg-icons";


class FileForm extends Component
{
    state = {
        isOpen: false
    };

    openModal = () => this.setState(({isOpen: true}));
    closeModal = () => this.setState(({isOpen: false}));

    onSubmit = (event) =>
    {
        event.preventDefault();
        this.closeModal();
        this.props.onSubmit(event);
    }

    render() {
        return (
            <div>
                <Button variant="success" onClick={this.openModal}><FontAwesomeIcon icon={faPlus} /> Add New File</Button>
                <Modal show={this.state.isOpen} onHide={this.closeModal}>
                    <form onSubmit={this.onSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add a new file</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-group">
                            <label htmlFor="filename">File Name: </label>
                            <input type='text' className="form-control" name="filename" id="filename" />
                            <label htmlFor="category">Category: </label>
                            <input type='text' className="form-control" name="category" id="category" />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" type="submit"><FontAwesomeIcon icon={faPlus}/> Add New File</Button>
                        <Button variant="danger" onClick={this.closeModal}><FontAwesomeIcon icon={faTimes} /> Cancel</Button>
                    </Modal.Footer>
                    </form>
                </Modal>
            </div>
        );
    }

}

export default FileForm;