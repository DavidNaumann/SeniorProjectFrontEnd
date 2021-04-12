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
            // set what to sort by
            setSorted: "name",
            // set polarity of direction to sort (high to low, low to high)
            polarity: -1
        };

    }

    // parses file from files array and presents it as a row
    createFiles(file, index) {
        return (
            <File file={file} index={index} onDelete={this.onDelete} />
        )
    }

    // on deletion call of a file
    onDelete = (uuid) => {
        this.props.onDelete(uuid);
    }

    // sets what field to sort by by the icons on the row headers
    setSortedField = (field) => {
        this.setState({setSorted: field, polarity: this.state.polarity*-1});
    }

    render() {
        // gets local instance of files and search
        let files = this.props.files;
        let search = this.props.search;

        // if search exists filter by it
        if (search) {
            files = files.filter(x => (x.name.toLowerCase()+x.date+x.creation_date+x.category.toLowerCase()).includes(search.toLowerCase()));
        }

        // get the key of what to sort by and polarity of which way to sort
        let key = this.state.setSorted;
        let polarity = this.state.polarity;

        // sort by key
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


        // list the files by mapping through it and creating File objects
        let listFiles = files.map((item, index) =>
        {
            return this.createFiles(item, index)
        });

        // display no file currently loaded well if no files loaded
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