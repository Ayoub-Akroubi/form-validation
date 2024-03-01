import { useEffect, useRef, useState } from "react"

export default function FormValidation(){

    const nameField= useRef()
    const emailField= useRef()
    const messageField= useRef()
    const countryField= useRef()
    const acceptConditionsField= useRef(false)
    const [errors, setErrors] =useState([])
    const [isFormSend,setIsFormSend] = useState(false)

   
    const validationForm = () => {
        const nameValue = nameField.current.value
        const emailValue = emailField.current.value
        const messageValue = messageField.current.value 
        const countryValue = countryField.current.value
        const acceptConditionsValue = acceptConditionsField.current.checked
        let isFormValid = true

        if( nameValue.trim() === ''){
            setErrors( (prevState) => { 
                return {
                    ...prevState,
                    ...{'name' : 'Name is required'}
                }
            })
            isFormValid = false
        }

        if( emailValue.trim() === ''){
            setErrors( (prevState) => { 
                return {
                    ...prevState,
                    ...{'email' : 'Email is required'}
                }
            })
            isFormValid = false
        }else if(!emailValue.match(/^\S+@\S+\.\S+$/)) {
            setErrors( (prevState) => { 
                return {
                    ...prevState,
                    ...{'email' : 'Email incorrect'}
                }
            })
            isFormValid = false
        }

        if( messageValue.trim() === ''){
            setErrors( (prevState) => { 
                return {
                    ...prevState,
                    ...{'message' : 'Message is required'}
                }
            })
            isFormValid = false
        }

        if( countryValue.trim() === ''){
            setErrors( (prevState) => { 
                return {
                    ...prevState,
                    ...{'country' : 'country is required'}
                }
            })
            isFormValid = false
        }

        if( !acceptConditionsValue){
            setErrors( (prevState) => { 
                return {
                    ...prevState,
                    ...{'acceptAllConditions' : 'Accept conditions is required'}
                }
            })
            isFormValid = false
        }

        return isFormValid
    }
    const handleSubmit = (e) =>{
        e.preventDefault()
        setErrors([])
        setIsFormSend(false)
        if (validationForm()) {
            setIsFormSend(true)
            resetForm()
        }
    }

    const resetForm = () =>{
        nameField.current.value = ''
        emailField.current.value = ''
        messageField.current.value = ''
        countryField.current.value =''
        acceptConditionsField.current.checked = false
    }

    const displayErrors =()=>{
        return Object.entries(errors).map((error,key) =>{ 
            const [field,message] = error
            return <li key={key}>{field} : {message}</li> 
        })
    }
    const getError = (fieldName) => {
        return errors[fieldName]
    }
    const hasError = (fieldName) => {
        return getError(fieldName) !== undefined
    }
    const displayError = (fieldName) => {
        const field = document.querySelector(`#${fieldName}`)
        if (hasError(fieldName)) {
            field.style.border = "1px solid red"
            return <div className={"text-danger"}>{getError(fieldName)}</div>
        }
        if (field !== null) {
            field.removeAttribute('style')
        }
    }

    const handelChange = () => {
        validationForm()
    }

    return <div className={"container-fluid w-75 mx-auto my-4 "}>
        {Object.keys(errors).length>0 ?
            <div className="alert alert-danger" role="alert">
                <strong>Error</strong>
                <ul>
                    {displayErrors()}
                </ul>
            </div>
            :" "
        }

        {isFormSend ? 
            <div className="alert alert-success" role="alert">
                <strong>Success</strong> Message sent successfuly.
            </div>
            : " "
        }
       <form onSubmit={handleSubmit}>
            <h1>Contact form</h1>
            <hr/>
            <div className="form-outline mb-4">
                <label className="form-label" htmlFor="name">Name</label>
                <input type="text" id="name" className="form-control" ref={nameField} onChange={handelChange}/>
                {displayError("name")}
            </div>

            <div className="form-outline mb-4">
                <label className="form-label" htmlFor="email">Email address</label>
                <input type="text" id="email" className="form-control" ref={emailField} onChange={handelChange}/>
                {displayError("email")}
            </div>

            <div className="form-outline mb-4">
                <label className="form-label" htmlFor="message">Message</label>
                <textarea className="form-control" id="message" rows="4" ref={messageField} onChange={handelChange}></textarea>
                {displayError("message")}
            </div>

            <div className="form-group mb-4">
                <label>Country</label>
                <label htmlFor="country"></label>
                <select className="form-control" id="country" ref={countryField} onChange={handelChange}>
                    <option value=''>Select country</option>
                    <option value='MA'>Maroc</option>
                    <option value='DZ'>Algérie</option>
                    <option value='TN'>Tunisie</option>
                </select>
                {displayError("country")}
            </div>

            <div className="form-check mb-4">
                <div className="d-flex">
                    <input className="form-check-input me-2" type="checkbox" id="acceptAllConditions" ref={acceptConditionsField} onChange={handelChange}/>
                    <label className="form-check-label" htmlFor="acceptAllConditions">
                        Accept all conditions
                    </label>
                </div>
                {displayError("acceptAllConditions")}
            </div>

            <button type="submit" className="btn btn-primary w-100 mb-4">Submit</button>
        </form>
    </div>
}