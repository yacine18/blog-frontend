import React, { useState, useContext } from 'react'
import { Form, Button } from 'react-bootstrap'
import ErrorsAlert from '../../components/errors/ErrorsAlert'
import UserContext from '../../context/UserContext'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const NewArticle = () => {

    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [image, setImage] = useState()
    const [error, setError] = useState(null)

    const history = useHistory()
    const { userData, setUserData } = useContext(UserContext)

    const handleTitle = e => {
        setTitle(e.target.value)
        console.log(title)
    }

    const handleDescription = e => {
        setDescription(e.target.value)
        console.log(description)
    }

    const handleUpload = e => {
        setImage(e.target.value)
        console.log(image)
    }

    const submit = async (e) => {

        e.preventDefault()
        let token = localStorage.getItem('auth-token')
        const createArticle = { title, description }
        {
            userData.user ? (
                await axios.post('https://blog-application-api.herokuapp.com/api/articles/create', createArticle, {
                    header: { 'auth-token': token }
                })
                    .then(response => {
                        {
                            console.log(userData.user)
                            setUserData({
                                token: userData.token,
                                user: userData.user
                            })
                            response ? (
                                history.push('/')
                            ) : (
                                    history.push('/new')
                                )
                        }
                    })
                    .catch(err => err.response.data.msg && setError(err.response.data.msg))
                    // .catch(err => console.log(err))
            ) : (
                    history.push('/login')
                )
        }

    }

    return (
        <div className="mt-5">
            <h3 className="text-center mb-4">Create New Article</h3>

            {error && (
                <ErrorsAlert message={error} clearError={() => setError(undefined)} />
            )}

            <Form className=" container col-sm-4" onSubmit={submit} >
                <Form.Group controlId="formGridAddress1">
                    <Form.Label>Title</Form.Label>
                    <Form.Control placeholder="Enter Title" onChange={handleTitle} />
                </Form.Group>
                <Form.Group controlId="formGridEmail">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" row="3" as="textarea" placeholder="Enter Description" onChange={handleDescription} />
                </Form.Group>

                <Form.File
                    className="mb-3"
                    id="image"
                    label="Please Choose Image"
                    custom
                    onChange={handleUpload}
                />
                <Button variant="primary" className="btn btn-block" type="submit">
                    Submit
               </Button>
            </Form>
        </div>
    )
}

export default NewArticle
