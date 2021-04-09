import {React, Component} from "react";
import {Modal, Button, FormControl, Row, Col, InputGroup, OverlayTrigger, Tooltip, ButtonGroup} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes} from "@fortawesome/free-solid-svg-icons";

/**
 * Form to fill out per file
 */
class FileForm extends Component
{
    state = {
        // is modal open
        isOpen: false,
        // search term to pass to FormControl
        search: ""
    };

    // gets the date for today in yyyy-mm-dd format
    getToday = () => {
        let date = new Date();
        let year = date.getFullYear();
        let month = ("0" + (date.getMonth() + 1)).slice(-2);
        let day = ("0" + date.getDate()).slice(-2);

        const today = year + "-" + month + "-" + day;

        return today;
    }

    // function for opening File Form Modal
    openModal = () => {
        if(this.props.length < 3) {
            this.setState(({isOpen: true}));
        }
        else
        {
            alert("File system full remove file to insert new item!");
        }
    }
    // function for closing modal
    closeModal = () => this.setState(({isOpen: false}));

    // on FileForm submit (inserting new file)
    onSubmit = (event) =>
    {
        event.preventDefault();
        this.closeModal();
        this.props.onSubmit(event);
    }

    // if user types into the search bar automatically filter
    onSearch = (event) =>
    {
        event.preventDefault();

        let search = event.target.value;

        this.setState({search: search});

        this.props.onSearch(search);
    }

    // on clearing of search bar (red x is clicked)
    onClear = (event) => {
        event.preventDefault();

        this.setState({search: ""});

        this.props.onSearch("");
    }

    render() {
        return (
            <div className="formComponent">
                <Row className="m-1">
                    <Col><Button variant="outline-success" onClick={this.openModal}><FontAwesomeIcon icon={faPlus} /> Add New File</Button></Col>
                    <Col>
                        <InputGroup>
                            <FormControl type="text" onChange={this.onSearch} value={this.state.search} id="search" name="search" placeholder="Search" />
                            <InputGroup.Append>
                                <OverlayTrigger
                                    placement="left"
                                    delay={{show: 250, hide: 400}}
                                    overlay={<Tooltip id="primary-tooltip" >Clear Search</Tooltip>}
                                >
                                <Button variant="outline-danger" onClick={this.onClear}><FontAwesomeIcon icon={faTimes} /></Button>
                                </OverlayTrigger>
                            </InputGroup.Append>
                        </InputGroup>
                    </Col>
                </Row>
                <Modal show={this.state.isOpen} onHide={this.closeModal}>
                    <form onSubmit={this.onSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add a new file</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-group">
                            <label htmlFor="filename">File Name: </label>
                            <input type='text' className="form-control" name="filename" id="filename" required />
                            <label htmlFor="category">Category: </label>
                            <input type='text' className="form-control" name="category" id="category" />
                            <label htmlFor="creation_date">Creation Date: </label>
                            <input type='date' className="form-control" defaultValue={this.getToday()} name="creation_date" id="creation_date" />
                            <label htmlFor="drawer">Drawer: </label>
                            <select id="drawer" name="drawer" className="form-control">
                                <option value="1">1</option>
                                <option value="1">2</option>
                            </select>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" type  ="submit"><FontAwesomeIcon icon={faPlus}/> Add New File</Button>
                        <Button variant="danger" onClick={this.closeModal}><FontAwesomeIcon icon={faTimes} /> Cancel</Button>
                    </Modal.Footer>
                    </form>
                </Modal>
            </div>
        );
    }

}

export default FileForm;