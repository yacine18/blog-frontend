import React, { useState, useContext } from 'react'
import { Form, Button } from 'react-bootstrap'
import ErrorsAlert from '../../components/errors/ErrorsAlert'
import UserContext from '../../context/UserContext'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const NewArticle = () => {

    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [image, setImage] = useState(null)
    const [fileName, setFileName] = useState("Selete an Image")
    const [error, setError] = useState(null)

    const history = useHistory()
    const { userData, setUserData } = useContext(UserContext)

    const onChange = e => {
        setImage(e.target.files[0])
        setFileName(e.target.files[0].name)
    }

    const submit = async (e) => {

        e.preventDefault()
        let token = localStorage.getItem('auth-token')
        const formData = new FormData()
        formData.append('image', image)
        const createArticle = { title, description }
        console.log(createArticle)
        {
            userData.user ? (
                await axios.post('https://blog-application-api.herokuapp.com/create', createArticle, formData, {
                    headers: { 'x-auth-token': token }
                })
                    .then(response => {
                        console.log(response.data)
                        {
                            
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
                    <Form.Control placeholder="Enter Title" onChange={e => setTitle(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formGridEmail">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" row="3" as="textarea" placeholder="Enter Description" onChange={e => setDescription(e.target.value)} />
                </Form.Group>

                <Form.File
                    className="mb-3"
                    encType="multipart/form-data"
                    id="path"
                    name="path"
                    label={fileName}
                    custom
                    onChange={onChange}
                />
                <Button variant="primary" className="btn btn-block" type="submit">
                    Submit
               </Button>
            </Form>
        </div>
    )
}

export default NewArticle
