import axios from "axios";

export default {
  search: function (searchTerm) {
    return axios.get("https://www.googleapis.com/books/v1/volumes?q=" + searchTerm + "&maxResults=40&key=AIzaSyAr0_LkySyKDBgp1lJhABUZ8tUaoD5wyac")
  },
  // Gets all books
  getBooks: function () {
    return axios.get("/api/books");
  },
  updateBook: function (id) {
    return axios.put("/api/books/" + id)
  },
  // Gets the book with the given id
  getBook: function (id) {
    return axios.get("/api/books/" + id);
  },
  // Deletes the book with the given id
  deleteBook: function (id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  addBook: function (bookData) {
    return axios.post("/api/books", bookData);
  }
};
