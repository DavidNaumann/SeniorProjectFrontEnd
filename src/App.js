import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderNavbar from './HeaderNavbar';
import FileControl from './FileControl';
import {Component} from "react";
import { io } from 'socket.io-client';

const socket = io('http://localhost:4001');
const { v4: uuidv4 } = require('uuid');

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            files: [],
        }

        // Functions for dealing with events such as insertion and deletion
        this.onSubmit = this.onSubmit.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    onSubmit = (event) => {
        event.preventDefault();

        const data = new FormData(event.target);
        const time = new Date(Date.now());
        const time_str = data.get("creation_date");

        const creation_date = new Date(time_str + "T00:00");
        console.log(creation_date.toLocaleString());
        let file = {
            name: data.get("filename"),
            category: data.get("category"),
            date: time.toLocaleString(),
            creation_date: creation_date.toLocaleDateString(),
            uuid: uuidv4(),
            drawer: parseInt(data.get("drawer")),
        }


        socket.emit('insert file', file);
    }

    onDelete = (uuid) => {
        socket.emit('delete file', uuid);
    }

    componentDidMount() {
        socket.on("connect", () => {
            socket.emit('get files');
        });

        socket.on('receive files', (files) => {
            this.setState({files: files});
        });
    }


    render() {
        return (
            <div className="App">
                <HeaderNavbar/>
                <FileControl files={this.state.files} onSubmit={this.onSubmit} onDelete={this.onDelete} />
            </div>
        );
    }
}

export default App;
