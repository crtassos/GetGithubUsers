import React, {useState, useContext} from 'react'
import GithubContext from '../../context/github/GithubContext'
import AlertContext from '../../context/alert/alertContext'

//rce - class based component emmet
const Search = () => {
    const githubContext = useContext(GithubContext)
    const alertContext  = useContext(AlertContext)

    const { searchUsers, clearUsers, users } = githubContext
    const { setAlert } = alertContext

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
                {users.length > 0 && (<button 
                    className="btn btn-light btn-block" 
                    onClick={clearUsers}>
                     clear
                </button>)}
            </div>
        )
}


export default Search
