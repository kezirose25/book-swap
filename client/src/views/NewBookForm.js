import React, {useState} from "react";



export default function NewBookForm(props) {
    let [formData, setFormData] = useState({
      title: "",
      authors: "",
      genre: ""
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
        bookcondition: condition
      }
      props.addBookCB(newBook);
      setFormData({
        title: "",
        authors: "",
        genre: ""
      });
    };

  return (
    
    <div id="new-book-form">
        <h3>Add Book</h3>

        <form onSubmit={e => handleSubmit(e)}>
        <div>
          <label>
            Title:
            <input
              name="title"
              value={formData.title}
              onChange={e => handleChange(e)}
              placeholder="Enter the title here"
            />
          </label>

          <label>
            Author(s):
            <input
              name="authors"
              value={formData.authors}
              onChange={e => handleChange(e)}
              placeholder="Enter the author or authors here"
            />
          </label>

          <label>
            Genre:
            <input
              name="genre"
              value={formData.genre}
              onChange={e => handleChange(e)}
              placeholder="Enter the genre here"
            />
          </label>

        </div>

        <div>
          <label id="condition-label" htmlFor="category">
            Condition of the book:
          </label>

          <select
            name="condition"
            onChange={e => handleCondition(e)}
          >
            <option value="" hidden>
              Select your option
            </option>
            <option value="brandnew">Brand new</option>
            <option value="euc">Excellent used condition</option>
            <option value="somewearandtear">Some wear and tear</option>
          </select>
        </div>

        <button type="submit">
          Submit
        </button>

      </form>

    </div>
  );
}