import {Component} from "react";
import {Button, ButtonGroup} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUp, faSearch, faTrash} from "@fortawesome/free-solid-svg-icons";

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
            <tr key={this.index.toString()}>
                <td>{this.index.toString()}</td>
                <td>{this.props.file.name}</td>
                <td>{this.props.file.date}</td>
                <td>{this.props.file.category}</td>
                <td>
                    <ButtonGroup aria-label="File Controls">
                        <Button variant="primary"><FontAwesomeIcon icon={faArrowUp} /></Button>
                        <Button variant="secondary"><FontAwesomeIcon icon={faSearch} /></Button>
                        <Button variant="danger" onClick={this.onDelete}><FontAwesomeIcon icon={faTrash} /></Button>
                    </ButtonGroup>
                </td>
            </tr>
        )
    }

}

export default File;