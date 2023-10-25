import { useState } from "react"

const SearchPage = () => {
  const selectArray = ['posts', 'users', 'comments', 'albums', 'photos']
  const [option, setOption] = useState('')

  const optionElement = selectArray.map((option, index) => {
    return (
      <option value={option} key={index}>{option}</option>
    )
  })

  const searchFormHandler = (event) => {
    event.preventDefault()
    console.log(option)
  }
  
  const selectValueHandler = (event)=>{
    setOption(event.target.value)
  }

  return (
    <form onSubmit={searchFormHandler}>
      <div className="form-control">
        <label htmlFor="option-element"></label>
        <select id="option-element" onChange={selectValueHandler}>
          {optionElement}
        </select>

        <button type="submit">Search</button>
      </div>

    </form>
  )
}

export default SearchPage

