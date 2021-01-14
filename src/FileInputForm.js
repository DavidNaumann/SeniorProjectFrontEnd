import {Component} from "react";
import Files from "./Files";
import FileForm from "./FileForm";

class FileInputForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            files: [],
            filecount: 0
        }

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();

        const data = new FormData(event.target);
        const prevFiles = this.state.files;
        const time = new Date(Date.now())

        this.setState({filecount: this.state.filecount + 1})

        let file = {
            id: this.state.filecount.toString(),
            name: data.get("filename"),
            category: data.get("category"),
            date: time.toLocaleString()
        }

        prevFiles.push(file);

        this.setState({files: prevFiles});
    }

    render() {
        return (
            <div className="FilesContainer">
                <FileForm onSubmit={this.onSubmit}/>
                <Files files={this.state.files} />
            </div>
        );
    }

}


export default FileInputForm;