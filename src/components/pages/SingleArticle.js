import axios from 'axios'
import React, { useState, useEffect, useContext } from 'react'
import { Card, Button } from 'react-bootstrap'
import UserContext from '../../context/UserContext'
import ErrorsAlert from '../errors/ErrorsAlert'
import { Link, useHistory } from 'react-router-dom'

const SingleArticle = (props) => {

    const [article, setArticle] = useState([])
    const [error, setError] = useState(null)


    const history = useHistory()
    const { userData, setUserData } = useContext(UserContext)



    useEffect(() => {
        const oneArticle = async () => {
            try {
                const url = "https://blog-application-api.herokuapp.com/api/articles/" + props.match.params.id;
                await axios.get(url)
                    .then(res => {
                        setArticle(res.data)
                    }

                    )
                    .catch(err => err.response.data.msg && setError(err.response.data.msg))
            } catch (err) {
                err.response.data.msg && setError(err.response.data.msg)
            }


        }

        oneArticle()
    })


    const deleteArticle = async (id) => {

        let token = localStorage.getItem('auth-token')

        {
            userData.user ? (
                await axios.delete('https://blog-application-api.herokuapp.com/api/articles/delete/' + props.match.params.id, {
                    headers: { 'x-auth-token': token }
                })
                    .then(response => {
                        setUserData({
                            token: userData.token,
                            user: userData.user
                        })
                        {
                            response ? (
                                history.push('/')
                                
                            ) : (
                                    history.push('/article/' + id)
                                )
                        }
                    })
                    .catch(err => err.response.data.msg && setError(err.response.data.msg))
            ) : (
                history.push('/login')
            )
        }

    }
    
    const articleImage = `http://localhost:5000/${article.image}`
    return (
        <div className="container mt-5">

            {error && (
                <ErrorsAlert message={error} clearError={() => setError(undefined)} />
            )}
            
          
            <div >
                <Card className="container" >
                    <div>
                        
                        <Card.Img variant="top" className="container mt-3" align="center" height="300px" alt="articleImage" src={articleImage} />
                        <Card.Title className="mt-4 mr-5 ml-5">{article.title}</Card.Title>
                        <Card.Body>
                            <Card.Text className="mr-5 ml-5 mt-2 mb-4">
                                {article.description}
                            </Card.Text>
                            <Link to={'/edit/' + article._id}>
                                <Button className=" mr-3" variant="warning">Edit Article</Button>
                            </Link>

                            <Button onClick={() => deleteArticle(article._id)} variant="danger">Delete Article</Button>
                        </Card.Body>
                    </div>
                </Card>
            </div>

        </div>
    )
}

export default SingleArticle
