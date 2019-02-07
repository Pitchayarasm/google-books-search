import React from "react";
import axios from "axios";
import "./search.css"

class Search extends React.Component {
  state = {
    search: "",
    result : []
  };

  search = (title) => {
    axios.get("https://www.googleapis.com/books/v1/volumes?q="+ title)
    .then( (res) => {
      if (res) {
        this.setState({
          result : res.data.items,
          search : ""
        })
      } else {
        alert("Book not found!")
      }
    })
  }

  clearResult = () => {
    this.setState({
      result : []
    })
  }

  handleInputChange = event => {
    this.setState({
      search : event.target.value
    });
  };

  handleFormSearch = event => {
    event.preventDefault();
    this.search(this.state.search)
  };

  saveBook = book => {
    console.log(book.volumeInfo.authors, book.volumeInfo.title, book.volumeInfo.description, book.volumeInfo.infoLink, book.volumeInfo.imageLinks.thumbnail)
    let imageSave = ""
    if (book.volumeInfo.imageLinks) {
        imageSave = book.volumeInfo.imageLinks.thumbnail
      } else  {
        imageSave = null;
      }
      axios.post("/api/books" , {
        author : book.volumeInfo.authors,
        title : book.volumeInfo.title,
        description : book.volumeInfo.description,
        link : book.volumeInfo.infoLink,
        image : {imageSave}
      }).then( data => {
        console.log(data)
        this.setState({
          author: [],
          title: "",
          description: "",
          image: "",
          link: ""
        })
      });
  }

  render() {
    return (
      <>
        {/* For Book Search */}
        <div className="container">
              <h4>Book Search</h4>
              <form className="form mt-3" onSubmit={this.submitProduct}>
              <input
                  onChange = {this.handleInputChange}
                  value = {this.state.search}
                  name = "search"
                  type = "text"
                  className = "form-control"
                  placeholder = "Search by Title"
                  id = "search"
                />
              <button style={{float:"right"}} onClick={this.clearResult} className="btn btn-dark mt-3">Clear Result</button>
              <button style={{float:"right", marginRight : "20px"}} onClick={this.handleFormSearch} className="btn btn-dark mt-3">Search</button>
              <br/> <br/>
            </form>
        </div>
        
        {/* For The Result */}
        { this.state.result.map( book => 
            <div className="container result" key={book.volumeInfo.infoLink} style={{visibility : book.volumeInfo.title? "visible" : "hidden"}} >
              <ul style={{listStyle: "none"}}>
                <li >
                  <button style={{float:"right"}} onClick={() => this.saveBook(book)} disabled={!book.volumeInfo.imageLinks} className="btn btn-dark mt-3">Save</button>
                  <button style={{float:"right", marginRight:"10px"}} className="btn btn-dark mt-3"><a target ="_ blank" href={book.volumeInfo.infoLink}>View</a></button>
                </li>
              </ul>
              <h5>Title : {book.volumeInfo.title}</h5>
              <p>{book.volumeInfo.authors ? `Written By : ${book.volumeInfo.authors.join(" , ")}` : `Written By : Not available` }</p>
              <div className="row">
                    <div className="col-md-2">
                      {book.volumeInfo.imageLinks ? <img src={book.volumeInfo.imageLinks.thumbnail} alt="Book image"/> : <img style={{width:"128px", height:"200px"}} src="https://media1.giphy.com/media/26xBIygOcC3bAWg3S/giphy.gif?cid=3640f6095c5c6b47532f63642e308d9c" alt="Book image"/>}
                    </div>
                  <div className="col-md-10">
                      <p>{book.volumeInfo.description}</p>
                  </div>
              </div>
            </div>
          )
        }
      </>
    );
  }
}

export default Search;