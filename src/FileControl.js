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
        this.setState({
            openCloseDrawerModal: true,
        });
        this.props.onDelete(uuid);
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
                <FileForm onSubmit={this.onSubmit} onSearch={this.onSearch} length={this.props.files.length} />
                <Files files={this.props.files} onDelete={this.onDelete} search={this.state.search} />
                <CloseDrawerForm onClose={this.onClose} isOpen={this.state.openCloseDrawerModal} />
            </div>
        );
    }

}


export default FileControl;