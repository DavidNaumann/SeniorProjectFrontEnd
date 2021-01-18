import {Component} from "react";
import Files from "./Files";
import FileForm from "./FileForm";

/**
 *
 */
class FileControl extends Component {
    onSubmit = (event) =>
    {
        event.preventDefault();
        this.props.onSubmit(event);
    }

    onDelete = (uuid) =>
    {
        this.props.onDelete(uuid);
    }

    render() {
        return (
            <div className="FilesContainer">
                <FileForm onSubmit={this.onSubmit}/>
                <Files files={this.props.files} onDelete={this.onDelete} />
            </div>
        );
    }

}


export default FileControl;