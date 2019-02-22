import React, { Component } from "react";
import API from "../utils/API";
import { BookList, Item } from "../components/BookList";
import { DeleteButton } from "../components/DeleteButton";
import { ViewButton } from "../components/ViewButton";
import { ReadButton } from "../components/ReadButton";
import NavBar from "../components/NavBar";

class Books extends Component {
    state = {
        readList: [],
        finishedList: [],
        searchInput: "",
        title: "",
        author: "",
        description: "",
        image: "",
        link: "",
        read: "",
        id: ""
    }

    componentDidMount() {
        this.getBooks();
    }

    handleStateChange = (event, err) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
        return this.state;
    };

    getBooks = () => {
        API.getBooks()
            .then(res => {
                var read = [];
                var unread = [];
                for (var i = 0; i < res.data.length; i++) {
                    if (res.data[i].read === "true") {
                        read.push(res.data[i])
                    }
                    else {
                        unread.push(res.data[i])
                    }
                }
                this.setState({ finishedList: read, readList: unread });
            })
            .catch(err => console.log(err));
    }

    deleteBook = event => {
        console.log(event.target.id)
        var id = event.target.id;
        API.deleteBook(id)
            .then(() => {
                this.getBooks();
                window.alert("Book deleted from your lists!");
            })
            .catch(err => console.log(err));
    }

    openBook = event => {
        event.preventDefault();
        var title = event.target.title;
        var author = event.target.getAttribute('author');
        var description = event.target.getAttribute('description');
        var image = event.target.getAttribute('image');
        var link = event.target.getAttribute('link');
        var read = event.target.getAttribute('read');
        var id = event.target.getAttribute('id');
        this.setState({
            title: title,
            author: author,
            description: description,
            image: image,
            link: link,
            read: read,
            id: id
        });
    }

    markAsRead = event => {
        var id = event.target.id;
        API.updateBook(id)
            .then(() => {
                this.getBooks();
                window.alert("Book marked as read!");
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div>
                <NavBar />
                <div className="container">
                    <div id="modal1" className="modal modal-fixed-footer">
                        <div style={{ textAlign: "center" }} className="modal-content">
                            <img src={this.state.image} alt="book"></img>
                            <h4>{this.state.title}</h4>
                            <p>{this.state.author}</p>
                            <br />
                            <p>{this.state.description}</p>
                            <a href={this.state.link}>View in Google Books</a>
                        </div>
                        <div className="modal-footer">
                            <ReadButton
                                id={this.state.id}
                                className="modal-close waves-effect waves-green btn"
                                onClick={this.markAsRead}
                            />
                            <DeleteButton
                                id={this.state.id}
                                className="modal-close waves-effect waves-green btn"
                                onClick={this.deleteBook}
                            />
                        </div>
                    </div >
                    <div className="row" style={{ marginTop: "25px", paddingBottom: "25px", backgroundColor: "rgba(255,255,255,.5" }}>
                        <div className="col m6">
                            <h5 style={{ textAlign: "center" }}>Reading List</h5>
                            {
                                this.state.readList.length ? (
                                    <BookList>
                                        {this.state.readList.map(item => (
                                            <Item key={item._id}>
                                                <a style={{ display: "block", color: "black" }} href={item.link}>
                                                    <b>{item.title}</b> by {item.author}
                                                </a>
                                                <ViewButton
                                                    title={item.title}
                                                    author={item.author}
                                                    description={item.description}
                                                    image={item.image}
                                                    link={item.link}
                                                    read={item.read}
                                                    id={item._id}
                                                    onClick={this.openBook}
                                                />
                                                <ReadButton
                                                    id={item._id}
                                                    className="modal-close waves-effect waves-green btn"
                                                    onClick={this.markAsRead}
                                                />
                                                <DeleteButton
                                                    id={item._id}
                                                    className="modal-close waves-effect waves-green btn"
                                                    onClick={this.deleteBook}
                                                />
                                            </Item>
                                        ))}
                                    </BookList>
                                ) : (
                                        <h4> No results </h4>
                                    )
                            }
                        </div>
                        <div className="col m6">
                            <h5 style={{ textAlign: "center" }}>Finished Books</h5>
                            {
                                this.state.finishedList.length ? (
                                    <BookList>
                                        {this.state.finishedList.map(item => (
                                            <Item key={item._id}>
                                                <a style={{ display: "block", color: "black" }} href={item.link}>
                                                    <b>{item.title}</b> by {item.author}
                                                </a>
                                                <ViewButton
                                                    title={item.title}
                                                    author={item.author}
                                                    description={item.description}
                                                    image={item.image}
                                                    link={item.link}
                                                    read={item.read}
                                                    id={item._id}
                                                    onClick={this.openBook}
                                                />
                                                <DeleteButton
                                                    id={item._id}
                                                    className="modal-close waves-effect waves-green btn"
                                                    onClick={this.deleteBook}
                                                />
                                            </Item>
                                        ))}
                                    </BookList>
                                ) : (
                                        <h4> No results </h4>
                                    )
                            }
                        </div>
                    </div>
                </div >
            </div>
        )
    }
}

export default Books;