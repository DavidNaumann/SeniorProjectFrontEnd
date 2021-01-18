import {Component} from "react";
import {Table} from "react-bootstrap";

import File from "./File";

/**
 * Files stores all of the File objects that are on the database
 */
class Files extends Component {
    createFiles(file, index) {
        return (
            <File file={file} index={index} onDelete={this.onDelete} />
        )
    }

    onDelete = (uuid) => {
        this.props.onDelete(uuid);
    }

    render() {
        let files = this.props.files;
        let listFiles = files.map((item, index) =>
        {
            return this.createFiles(item, index)
        });

        // TODO: better error handling/showing what is wrong (not connected, no files, etc.)
        if(files === undefined || files.length === 0)
        {
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