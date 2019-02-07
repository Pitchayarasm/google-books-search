import React from "react";
import axios from "axios";
import "./search.css"

class Save extends React.Component {
  state = {
    results : []
  };

  componentDidMount() {
    axios.get("/api/books").then( (response) => {
      console.log(response.data)
      this.setState({
        results: response.data
      });
    });
  }

  deleteBook = book => {
    axios.delete(`/api/books/${book._id}`)
    .then(() => {
      console.log("delete success");
      this.componentDidMount();
    }).catch( err => {
      console.log(err)
    })
  }

  render() {
    return (
      <div>
        {
          this.state.results.map((book) => {
            return (
              <div className="container result" key={book._id} style={{visibility : book.title ? "visible" : "hidden"}} >
                <ul style={{listStyle: "none"}}>
                  <li >
                    <button style={{float:"right"}} onClick={()=>{this.deleteBook(book)}} className="btn btn-dark mt-3">Delete</button>
                    <button style={{float:"right", marginRight:"10px"}} className="btn btn-dark mt-3"><a target ="_ blank" href={book.link}>View</a></button>
                  </li>
                </ul>
                <h3>Saved Book</h3>
                <h5>Title : {book.title}</h5>
                <p>{book.author ? `Written By : ${book.author}` : `Written By : Not available` }</p>
                <div className="row">
                    <div className="col-md-2">
                    {book.image ? <img src={book.image.thumbnail} alt="Book image"/> : <img style={{width:"128px", height:"200px"}} src="https://media1.giphy.com/media/26xBIygOcC3bAWg3S/giphy.gif?cid=3640f6095c5c6b47532f63642e308d9c" alt="Book image"/>}
                    </div>
                    <div className="col-md-10">
                        <p>{book.description}</p>
                    </div>
                </div>
              </div>
            );
          })
        }
      </div>
    );
  }
}


export default Save;


