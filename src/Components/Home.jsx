import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import '../Styles/Home.css';
import music from '../images/music-note.png'
import pet from '../images/pet-care.png'
import dustpan from '../images/dustpan.png'
import beauty from '../images/beauty.png'
import homer from '../images/home.png'

function Home() {
  const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
    </svg>
  )
  const categoryImages = {
  'Beauty': beauty,
  'Pet Care': pet,
  'Song': music,
  'Sepister': dustpan, 
  'Homer': homer 
};


  return (
    <div className="hero-section text-white text-center" >
      <div className="container">
        <h1 className="mb-4 mt-100px" id="text">Book local Services instantly</h1>
        <Row className="justify-content-center mt-150px">
          <Col md={10}>
            <Form className="d-flex search-form">
              <Form.Control type="search" placeholder="Search" />
              <Button variant="success">
                <SearchIcon />
              </Button>
            </Form>
          </Col>
        </Row>
      </div>

      <div className="quick-links mt-5 ">
        <h5 className="mb-4">Category Quick Links</h5>
        <Row xs={2} md={6} className="g-4  cards">
          {[

            'Beauty', 'Homer', 'Sepister', 'Pet Care','Song'
          ].map((category, index) => (
            <Col key={index}>
              <a href="#" className="text-decoration-none text-dark d-block">
                <Card className="h-100 active-card">
                  <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                    <img src={categoryImages[category]} alt={category} className='category-icon'/>
                    <Card.Title as="h6" className="mt-2">{category}</Card.Title>
                  </Card.Body>
                </Card>
              </a>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default Home;
