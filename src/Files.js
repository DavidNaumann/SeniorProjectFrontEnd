import {Component} from "react";
import {Col, Row} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSort} from "@fortawesome/free-solid-svg-icons";

import File from "./File";

/**
 * Files stores all of the File objects that are on the database
 */
class Files extends Component {

    constructor(props) {
        super(props);

        this.state = {
            setSorted: "name",
            polarity: -1
        };

    }

    createFiles(file, index) {
        return (
            <File file={file} index={index} onDelete={this.onDelete} />
        )
    }

    onDelete = (uuid) => {
        this.props.onDelete(uuid);
    }

    setSortedField = (field) => {
        this.setState({setSorted: field, polarity: this.state.polarity*-1});
    }

    render() {
        let files = this.props.files;
        let search = this.props.search;

        if (search) {
            files = files.filter(x => (x.name.toLowerCase()+x.date+x.creation_date+x.category.toLowerCase()).includes(search.toLowerCase()));
        }

        let key = this.state.setSorted;
        let polarity = this.state.polarity;

        files.sort(function (a, b) {

            let keyA = a[key].toLowerCase();
            let keyB = b[key].toLowerCase();

            if(key === "date" || key === "creation_date") {
                keyA = new Date(a[key]);
                keyB = new Date(b[key]);
            }

            if (keyA < keyB) return -1*polarity;
            if (keyA > keyB) return polarity;

            return 0
        });

        let listFiles = files.map((item, index) =>
        {
            return this.createFiles(item, index)
        });

        // TODO: better error handling/showing what is wrong (not connected, no files, etc.)
            if(files.length === 0) {
                listFiles = (<Row className="m-1">
                        <Col>No files currently loaded</Col>
                    </Row>
                );
            }

        return (
            <div className="myFiles m-1">
                    <Row className="m-1">
                        <Col><b>#</b></Col>
                        <Col><b>File</b> <a href="#file" onClick={() => this.setSortedField('name')} ><FontAwesomeIcon icon={faSort}/></a></Col>
                        <Col className="d-none d-sm-block"><b>Insertion Date</b> <a href="#insertion_date" onClick={() => this.setSortedField('date')} ><FontAwesomeIcon icon={faSort}/></a></Col>
                        <Col className="d-none d-sm-block"><b>Creation Date</b> <a href="#creation_date" onClick={() => this.setSortedField('creation_date')} ><FontAwesomeIcon icon={faSort}/></a></Col>
                        <Col className="d-none d-sm-block"><b>Category</b> <a href="#category" onClick={()=> this.setSortedField("category")}><FontAwesomeIcon icon={faSort} /></a></Col>
                        <Col><b>Controls</b></Col>
                    </Row>
                    {listFiles}
            </div>
        )
    }
}

export default Files;