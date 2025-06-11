import { useState } from "react";
import "./SearchForm.css";


function SearchForm({ onSearch }) {

    let [input, setInput] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault();
        if (input.trim() !=="") {
            onSearch(input.trim());
        }
    }

    const FormSubmit=(event)=> {
        if (event.keyCode === 13) {
            console.log("enter")
        }
    }

    
    return (
        <div className="SearchForm">
            <form onSubmit={handleSubmit}>
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Search Movies" onKeyDown={(e) => FormSubmit(e)}></input>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default SearchForm