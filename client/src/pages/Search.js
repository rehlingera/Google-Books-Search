import React, { Component } from "react";
import API from "../utils/API";
import { BookList, Item } from "../components/BookList";
import { Input, SearchBtn } from "../components/SearchForm";
import { AddButton } from "../components/AddButton";
import { ViewButton } from "../components/ViewButton";
import NavBar from "../components/NavBar";

class Search extends Component {
    constructor(props) {
        super(props);
    };

    state = {
        results: [],
        searchInput: "",
        title: "",
        author: "",
        description: "",
        image: "",
        link: ""
    }

    changeSearchInput = event => {
        event.preventDefault();
        this.setState({
            searchInput: event.target.value
        });
    };

    search = event => {
        event.preventDefault();
        API.search(this.state.searchInput)
            .then(response => {
                this.setState({ results: response.data.items })
            })
    }

    openBook = id => {
        var target = this.state.results.filter(item => item.id===id)
        console.log(target);
        this.setState({
            title: target[0].volumeInfo.title ? target[0].volumeInfo.title : "Unknown",
            author: target[0].volumeInfo.authors ? target[0].volumeInfo.authors.join(', ') : "Unknown",
            description: target[0].volumeInfo.description ? target[0].volumeInfo.description : "N/A",
            image: target[0].volumeInfo.imageLinks && target[0].volumeInfo.imageLinks.thumbnail ? target[0].volumeInfo.imageLinks.thumbnail : "https://unidive.co.nz/wp-content/themes/456sailing/assets/img/no-product-image.png",
            link: target[0].volumeInfo.infoLink ? target[0].volumeInfo.infoLink : "",
            id: id
        });
    }

    addBook = id => {
        var target = this.state.results.filter(item => item.id===id)
        console.log(target);
        var bookData = {
            title: target[0].volumeInfo.title ? target[0].volumeInfo.title : "Unknown",
            author: target[0].volumeInfo.authors ? target[0].volumeInfo.authors.join(', ') : "Unknown",
            description: target[0].volumeInfo.description ? target[0].volumeInfo.description : "N/A",
            image: target[0].volumeInfo.imageLinks && target[0].volumeInfo.imageLinks.thumbnail ? target[0].volumeInfo.imageLinks.thumbnail : "https://unidive.co.nz/wp-content/themes/456sailing/assets/img/no-product-image.png",
            link: target[0].volumeInfo.infoLink ? target[0].volumeInfo.infoLink : "",
            read: "false"
        };
        console.log(bookData);
        API.addBook(bookData)
            .then(() =>
                window.alert("Book added to your reading list!"))
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
                            <AddButton
                                id={this.state.id}
                                onClick={() => this.addBook(this.state.id)}
                            />
                        </div>
                    </div >
                    <div className="row" style={{ marginTop: "25px", paddingBottom: "25px", backgroundColor: "rgba(255,255,255,.75" }}>
                        <div className="col m12 s12" style={{ textAlign:"center" }}>
                            <Input value={this.state.searchInput} onChange={this.changeSearchInput} />
                            <SearchBtn onClick={this.search} />
                            <br />
                            <BookList>
                                {this.state.results.map(item => (
                                    <Item key={item.id}>
                                        <img src={item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail ? item.volumeInfo.imageLinks.smallThumbnail : "https://unidive.co.nz/wp-content/themes/456sailing/assets/img/no-product-image.png"} height="100px"></img>
                                        <p><b>{item.volumeInfo.title ? item.volumeInfo.title : "Unknown"}</b> by {item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : "Unknown"}</p>
                                        <ViewButton
                                            id={item.id}
                                            onClick={() => this.openBook(item.id)}
                                        />
                                        <AddButton
                                            id={item.id}
                                            onClick={() => this.addBook(item.id)}
                                        />
                                    </Item>
                                ))}
                            </BookList>
                        </div>
                    </div>
                </div >
            </div>
        )
    }
}

export default Search;