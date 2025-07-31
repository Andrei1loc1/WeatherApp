import {useState} from "react"

function Search({onSearch}){
    const [input, setInput] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if(input.trim() !== ""){
            onSearch(input);
            setInput("");
        }
    }
    return <>
    <div className="search">
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder="Enter the city"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button className="search-btn" type="submit">Search</button>
        </form>
    </div>
    </>
}


export default Search