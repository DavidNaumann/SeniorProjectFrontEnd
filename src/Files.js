import {Component} from "react";
import {Table} from "react-bootstrap";
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
            files = files.filter(x => x.name.toLowerCase().includes(search.toLowerCase()));
        }

        let key = this.state.setSorted;
        let polarity = this.state.polarity;

        files.sort(function (a, b) {

            let keyA = a[key];
            let keyB = b[key];

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
            if(files.length === 0 || files === undefined) {
                listFiles = (<tr key={"-1"}>
                        <td></td>
                        <td>No files currently loaded</td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                );
            }

        return (
            <div className="myFiles">
                <Table responsive>
                    <thead>
                        <tr>
                            <th><b>#</b></th>
                            <th><b>File</b> <a href="#" onClick={() => this.setSortedField('name')} ><FontAwesomeIcon icon={faSort}/></a></th>
                            <th><b>Insertion Date</b> <a href="#" onClick={() => this.setSortedField('date')} ><FontAwesomeIcon icon={faSort}/></a></th>
                            <th><b>Creation Date</b> <a href="#" onClick={() => this.setSortedField('creation_date')} ><FontAwesomeIcon icon={faSort}/></a></th>
                            <th><b>Controls</b></th>
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