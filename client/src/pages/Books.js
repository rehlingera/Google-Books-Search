import React, { Component } from "react";
import API from "../utils/API";
import { BookList, Item } from "../components/BookList";
import { DeleteButton } from "../components/DeleteButton";
import { ViewButton } from "../components/ViewButton";
import { ReadButton } from "../components/ReadButton";
import NavBar from "../components/NavBar";

class Books extends Component {
    state = {
        allBooks: [],
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
    };

    getBooks = () => {
        API.getBooks()
            .then(res => {
                var allBooks = [];
                var read = [];
                var unread = [];
                for (var i = 0; i < res.data.length; i++) {
                    allBooks.push(res.data[i]);
                    if (res.data[i].read === "true") {
                        read.push(res.data[i])
                    }
                    else {
                        unread.push(res.data[i])
                    }
                }
                this.setState({ allBooks: allBooks, finishedList: read, readList: unread });
            })
            .catch(err => console.log(err));
    }

    deleteBook = id => {
        API.deleteBook(id)
            .then(() => {
                this.getBooks();
                window.alert("Book deleted from your lists!");
            })
            .catch(err => console.log(err));
    }

    openBook = id => {
        var target = this.state.allBooks.filter(item => item._id===id)
        console.log(target);
        this.setState({
            title: target[0].title,
            author: target[0].author,
            description: target[0].description,
            image: target[0].image,
            link: target[0].link,
            id: id
        });
    }

    markAsRead = id => {
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
                                                    id={item._id}
                                                    onClick={() => this.openBook(item._id)}
                                                />
                                                <ReadButton
                                                    id={item._id}
                                                    className="modal-close waves-effect waves-green btn"
                                                    onClick={() => this.markAsRead(item._id)}
                                                />
                                                <DeleteButton
                                                    id={item._id}
                                                    className="modal-close waves-effect waves-green btn"
                                                    onClick={() => this.deleteBook(item._id)}
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
                                                    id={item._id}
                                                    onClick={() => this.openBook(item._id)}
                                                />
                                                <DeleteButton
                                                    id={item._id}
                                                    className="modal-close waves-effect waves-green btn"
                                                    onClick={() => this.deleteBook(item._id)}
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