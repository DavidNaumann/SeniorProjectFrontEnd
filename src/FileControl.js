import {Component} from "react";
import Files from "./Files";
import FileForm from "./FileForm";

/**
 *
 */
class FileControl extends Component {

    constructor(props) {
        super(props);

        this.state = {
          search: ""
        };
    }


    onSubmit = (event) =>
    {
        event.preventDefault();
        this.props.onSubmit(event);
    }

    onSearch = (search) =>
    {
        this.setState({search: search});
    }

    onDelete = (uuid) =>
    {
        this.props.onDelete(uuid);
    }

    render() {
        return (
            <div className="FilesContainer">
                <FileForm onSubmit={this.onSubmit} onSearch={this.onSearch} />
                <Files files={this.props.files} onDelete={this.onDelete} search={this.state.search} />
            </div>
        );
    }

}


export default FileControl;