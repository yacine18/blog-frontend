import React, { useState, useContext, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import UserContext from '../../context/UserContext'
import ErrorsAlert from '../../components/errors/ErrorsAlert'
import axios from 'axios'

const EditArticle = (props) => {

    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [image, setImage] = useState()
    const [error, setError] = useState(null)


    const history = useHistory()
    const { userData, setUserData } = useContext(UserContext)

    const submit = (e) => {
        e.preventDefault()
        const editArticle = async (id) => {
            const token = localStorage.getItem('auth-token')
            const articleId = props.match.params.id
            const updatedArticle = { title, description, image }

            {
                userData.user ? (
                    await axios.put(`https://blog-application-api.herokuapp.com/api/articles/edit/${articleId}`, updatedArticle)
                        .then(res => {
                            {
                                res ? (
                                    history.push('/')
                                ) : (
                                        history.push(`/article/${articleId}`)
                                    )
                            }
                        })
                        .catch(err => err.response.data.msg && setError(err.response.data.msg))
                ):(
                    history.push('/login')
                )}

        }

        editArticle()
    }


    return (
        <div className="mt-5">
            <h3 className="text-center mb-4">Edit Article</h3>

            {error && (
                <ErrorsAlert message={error} clearError={() => setError(undefined)} />
            )}

            <Form className=" container col-sm-4" onSubmit={submit}  >
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
                    id="image"
                    label="Please Choose Image"
                    onChange={ e => setImage(e.target.value) }
                />

                <Button variant="primary" className="btn btn-block" type="submit">
                    Update
               </Button>
            </Form>
        </div>
    )
}

export default EditArticle
