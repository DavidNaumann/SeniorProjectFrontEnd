import {Component} from "react";
import {Button, ButtonGroup} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUp, faSearch, faTrash} from "@fortawesome/free-solid-svg-icons";
import {Row, Col} from "react-bootstrap";

/**
 * Class for the individual file and file details to display
 */
class File extends Component {
    constructor(props) {
        super(props);

        this.index = props.index;
    }

    onDelete = () => {
        let uuid = this.props.file.uuid;
        this.props.onDelete(uuid);
    }



    render() {
        return (
            <Row className="m-1 p-1">
                <Col>{this.index.toString()}</Col>
                <Col>{this.props.file.name}</Col>
                <Col className="d-none d-sm-block">{this.props.file.date}</Col>
                <Col className="d-none d-sm-block">{this.props.file.creation_date}</Col>
                <Col className="d-none d-sm-block">{this.props.file.category}</Col>
                <Col>
                    <ButtonGroup aria-label="File Controls">
                        <Button variant="primary"><FontAwesomeIcon icon={faArrowUp} /></Button>
                        <Button variant="secondary"><FontAwesomeIcon icon={faSearch} /></Button>
                        <Button variant="danger" onClick={this.onDelete}><FontAwesomeIcon icon={faTrash} /></Button>
                    </ButtonGroup>
                </Col>
            </Row>
        )
    }

}

export default File;