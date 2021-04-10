import {Component} from "react";
import Files from "./Files";
import FileForm from "./FileForm";
import CloseDrawerForm from "./CloseDrawer";

/**
 *
 */
class FileControl extends Component {

    constructor(props) {
        super(props);

        this.state = {
            // search text
            search: "",
            // open Close Drawer Modal
            openCloseDrawerModal: false
        };
    }

    // on submit of file form
    onSubmit = (event) =>
    {
        this.setState({
            openCloseDrawerModal: true,
        });
        event.preventDefault();
        this.props.onSubmit(event);
    }

    // on search bar being typed in
    onSearch = (search) =>
    {
        this.setState({search: search});
    }

    // on deletion of file
    onDelete = (uuid) =>
    {
        // checks to make sure file box isn't busy
        if(!this.props.busy) {
            this.setState({
                openCloseDrawerModal: true,
            });
            this.props.onDelete(uuid);
        }
        else
        {
            alert("File system currently in use by other user!");
        }
    }

    // on closing of the modal
    onClose = () =>
    {
        this.setState({
            openCloseDrawerModal: false
        });

        this.props.onClose();
    }

    render() {
        return (
            <div className="FilesContainer">
                <FileForm onSubmit={this.onSubmit} onSearch={this.onSearch} length={this.props.files.length} busy={this.props.busy} />
                <Files files={this.props.files} onDelete={this.onDelete} search={this.state.search} />
                <CloseDrawerForm onClose={this.onClose} isOpen={this.state.openCloseDrawerModal} />
            </div>
        );
    }

}


export default FileControl;