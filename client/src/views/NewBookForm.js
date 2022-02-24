import React, {useState} from "react";
import "./NewBookForm.css"

const API_KEY = "AIzaSyAM_2uMeXx-VdB2MhU4qvQOo-p4zCco3Gc"

export default function NewBookForm(props) {
  const [coverURL, setCoverURL] = useState("https://via.placeholder.com/230x300?text=No+Cover+Provided");  
  const [error, setError] = useState("");

  let [formData, setFormData] = useState({
      title: "",
      authors: "",
      genre: "",
      imgurl: "",
      description: "",
      isbn: ""
    });
    let [condition, setCondition] = useState("");
  
    const handleChange = e => {
        let { name, value } = e.target;
        setFormData(state => ({
          ...state,
          [name]: value
        }));
      };
  
    const handleCondition = event => {
      setCondition(event.target.value);
    };
  
    const handleSubmit = event => {
      event.preventDefault();
      let newBook = {
        title: formData.title,
        authors: formData.authors,
        genre: formData.genre,
        imgurl: formData.imgurl,
        description: formData.description,
        bookcondition: condition
      }
      props.addBookCB(newBook);
      setFormData({
        title: "",
        authors: "",
        genre: "",
        imgurl: "",
        description: "",
        isbn: ""
      });
    };

    const getCoverURL = async (event, title, author, isbn) => {
      event.preventDefault();
      setError("");
      let fetchURL = "";
      if (isbn) {
        fetchURL = `https://covers.openlibrary.org/b/ISBN/${isbn}-L.jpg?default=false`;
        try {
          let response = await fetch(fetchURL);
          console.log(response)
          if (response.ok) {
            setCoverURL(response.url);
          } else {
            setError(`Server error: ${response.status} ${response.statusText}`);
          }
        } catch (err) {
          setError(`Network error: ${err.message}`);
        }
      } else {
        fetchURL = `https://www.googleapis.com/books/v1/volumes?q=intitle:${title}&inauthor:${author}&key=${API_KEY}`;
        try {
          let response = await fetch(fetchURL);
          if (response.ok) {
            let data = await response.json();
            let picURL = data.items[0].volumeInfo.imageLinks.thumbnail;
            setCoverURL(picURL);
          } else {
            setError(`Server error: ${response.status} ${response.statusText}`);
          }
          
        } catch (err) {
          setError(`Network error: ${err.message}`);
        }
      }  
    };

  return (
    
    <div id="new-book-form">
        <h3>Add Book</h3>

        <form onSubmit={e => handleSubmit(e)}>
          <div className="d-flex">
          <div id="form-fields"> 
    
              <div className="mb-3">
                <label className="form-label" htmlFor="title">
                  Title:
                </label>
                <input
                    name="title"
                    value={formData.title}
                    onChange={e => handleChange(e)}
                    placeholder="Enter the title here"
                    className="form-control"
                    required
                  />
              </div>

              <div className="mb-3">
              <label className="form-label" htmlFor="authors">
                Author(s):
              </label>
              <input
                  name="authors"
                  value={formData.authors}
                  onChange={e => handleChange(e)}
                  placeholder="Enter the author or authors here"
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="isbn">
                  ISBN:
                </label>
                <input
                    name="isbn"
                    value={formData.isbn}
                    onChange={e => handleChange(e)}
                    placeholder="Enter the ISBN here"
                    className="form-control"
                  />
            </div>

          <div className="mb-3 d-flex justify-content-between">
          <div className="container">
          <label className="form-label" htmlFor="genre">
            Genre:
          </label>
          <input
              name="genre"
              value={formData.genre}
              onChange={e => handleChange(e)}
              placeholder="Enter the genre here"
              className="form-control"
            />
          </div>
          
          <div className="container">
          <label id="condition-label" htmlFor="category" className="form-label">
            Condition of the book:
          </label>

          <select
            name="condition"
            onChange={e => handleCondition(e)}
            className="form-select"
          >
            <option value="" hidden>
              Select your option
            </option>
            <option value="brandnew">Brand new</option>
            <option value="euc">Excellent used condition</option>
            <option value="somewearandtear">Some wear and tear</option>
          </select>
          </div>
          
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description:</label>
          <textarea 
          className="form-control" 
          id="description"
          name="description"
          value={formData.description} 
          onChange={e => handleChange(e)}
          rows="3"
          placeholder="Enter a brief description of your book here">
          </textarea>
          </div>

          </div>
        

          <div id="image-box">
          <label className="form-label d-block" htmlFor="imgurl">
                Cover photo:
          </label>
          <img id="cover-img" src={coverURL} />
          
          <div>
          <button className="btn btn-primary" onClick={e => getCoverURL(e, formData.title, formData.authors, formData.isbn)}>
          Generate Cover Automatically
          </button>
          <div className="form-text mb-3">For best results, please provide an ISBN on the left.</div>
          </div>
          
          
          <div className="mb-3">
              <input
                  name="imgurl"
                  value={formData.imgurl}
                  onChange={e => handleChange(e)}
                  placeholder="Enter an image URL here"
                  className="form-control"
                />
          </div>
          <button className="btn btn-primary" onClick={e => setCoverURL(formData.imgurl)}>
          Update Cover Image
          </button>
          
          </div>


          </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>

      </form>

    </div>

  );
}