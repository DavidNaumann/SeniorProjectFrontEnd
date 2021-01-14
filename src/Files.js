import {Component} from "react";
import {Button, ButtonGroup, Table} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faSearch, faArrowUp } from "@fortawesome/free-solid-svg-icons";

class Files extends Component {
    createFiles(file) {
        console.log("File: ", file);
        return (
            <tr>
                <td>{file.id}</td>
                <td>{file.name}</td>
                <td>{file.date}</td>
                <td>{file.category}</td>
                <td>
                    <ButtonGroup aria-label="File Controls">
                        <Button variant="primary"><FontAwesomeIcon icon={faArrowUp} /></Button>
                        <Button variant="secondary"><FontAwesomeIcon icon={faSearch} /></Button>
                        <Button variant="danger"><FontAwesomeIcon icon={faTrash} /></Button>
                    </ButtonGroup>
                </td>
            </tr>
        )
    }

    render() {
        let files = this.props.files;
        let listFiles = files.reverse().map(this.createFiles);

        if(files === undefined || files.length === 0)
        {
            listFiles = (<tr>
              <td></td>
              <td>No files currently loaded</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            );
        }

        return (
            <div class="groupFiles">
                <Table responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>File Name</th>
                            <th>Date Inserted</th>
                            <th>Categories</th>
                            <th>Controls</th>
                        </tr>
                    </thead>
                    <tbody>
                    {listFiles}
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default Files;