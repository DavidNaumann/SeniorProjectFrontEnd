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
            busy: true
        }

        // Functions for dealing with events such as insertion and deletion
        this.onSubmit = this.onSubmit.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }


    // on file form submission (put a new file in system)
    onSubmit = (event) => {
        event.preventDefault();

        if(!this.state.busy) {
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
        else
        {
            alert("Device busy, wait for current user to be done!");
        }
    }


    // on deletion of file (removal)
    onDelete = (uuid) => {
        if(!this.state.busy) {
            socket.emit('delete file', uuid);
        }
        else
        {
            alert("Device busy, wait for current user to be done!");
        }
    }

    // on close of drawer
    onClose = () => {
        socket.emit('close');
    }

    componentDidMount() {
        // on user connect
        socket.on("connect", () => {
            socket.emit('get files');
        });

        // on the backend sending back files from my_sql database
        socket.on('receive files', (files) => {
            this.setState({files: files});
        });

        socket.on('not busy', (busy) => {
            console.log('not busy');
            this.setState({busy: busy});
        });
    }


    render() {
        return (
            <div className="App">
                <HeaderNavbar/>
                <FileControl files={this.state.files} onSubmit={this.onSubmit} onClose={this.onClose} onDelete={this.onDelete} busy={this.state.busy} />
            </div>
        );
    }
}

export default App;
