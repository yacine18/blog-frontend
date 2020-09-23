import React, { useState, useEffect } from 'react'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ErrorsAlert from '../errors/ErrorsAlert'
import Spinner from 'react-bootstrap/Spinner'
import axios from 'axios'

const Home = () => {

  const [articles, setArticles] = useState([])
  const [error, setError] = useState()
  const [loading, setLoading] = useState(true)


  useEffect(() => {

    const fetchData = async () => {
      const url = 'https://blog-application-api.herokuapp.com/api/articles'
      await axios.get(url,{
      })
        .then(res => {
          setLoading(false)
          setArticles(res.data)
        })
        .catch(err => err.response.data.msg && setError(err.response.data.msg))
    }

    fetchData()

  }, [])

  return (
      <div className="container mt-5">
        {error && (
          <ErrorsAlert message={error} clearError={() => setError(undefined)} />
        )}

        <div className="row mr-3 ml-4 my-auto px-2">

            {loading && <Spinner animation="border" className="mx-auto mt-5" variant="primary" />}
            
              {articles.map(article => {
                 const articleImage = `https://blog-application-api.herokuapp.com/${article.image}`
                  return (
                    <Card className="mb-3 mr-3 ml-2" style={{ width: '18rem' }} key={article._id}>
                      <Card.Img variant="top" alt="articleImage" src={articleImage} />
                      <Card.Body>
                        <Card.Title>{article.title}</Card.Title>
                        <Card.Text>
                          {article.description}
                        </Card.Text>
                        <Link className="text-decoration-none" to={'/article/' + article._id}>
                          <Button className="btn-block" variant="light">Read More</Button>
                        </Link>
                      </Card.Body>
                     
                               
                    </Card>
                    
                  )
                
              })}
            
        </div>
      </div>
  )

}

export default Home
