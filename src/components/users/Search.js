import React, {useState} from 'react'
import PropTypes from 'prop-types'

//rce - class based component emmet
const Search = ({ showClear, clearUsers, setAlert, searchUsers }) => {
    const [text, setText] = useState('')

    const onChange = (event)=>
       setText(event.target.value)

  
    const onSubmit = (event) =>{
        event.preventDefault()
        if(text === ''){
          setAlert('Enter text!!', 'light')
        } else{
            
        searchUsers(text)
        setText('')
        }
    }
          
        return (
            <div>
                <form  onSubmit={onSubmit} className="form">
                    <input 
                        type="text" 
                        name="text" 
                        placeholder="Search users..."
                        value={text}
                        onChange={onChange}/>
                    <input 
                        type="submit"
                        value="Search.." 
                        className="btn btn-dark btn-block"
                    />
                </form>
                {showClear && (<button 
                    className="btn btn-light btn-block" 
                    onClick={clearUsers}>
                     clear
                </button>)}
            </div>
        )
}

Search.propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired, 
    showClear: PropTypes.bool.isRequired,
    setAlert:PropTypes.func.isRequired,
}

export default Search
