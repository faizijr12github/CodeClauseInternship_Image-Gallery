"use client";
import { useState, useEffect } from "react";
import { Container, Form, Button, Row, Col, Pagination } from "react-bootstrap";
import axios from "axios";

export default function Home() {

  const API_KEY = "TMoULUz2vTWaIb83E2xaSHLvhaFwDLryZjG2WyDb1dpIkaobx2eJ1hFO";

  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("nature");
  const [loading, setLoading] = useState(false);

  const fetchImage = async (searchQuery) => {
    setLoading(true);
    try {
      const res = await axios.get(`https://api.pexels.com/v1/search?query=${searchQuery}&per_page=80`, {
        headers: {
          Authorization: API_KEY,
        },
      });
      console.log(res)
      setImages(res.data.photos);
    } catch (error) {
      console.error('Error fetching the image:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImage(query);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchImage(query);
  };

  const categoryHandler = (category) => {
    fetchImage(category);
  }

  return (
    <>
      {/* Hero-section */}
      <Container fluid className="background-container py-5 mb-5">
        <Row className="text-center justify-content-center align-items-center">
          <Col lg="6" md="6">
            <img src="/img-gallery-logo.png" alt="hero-img" className="img-fluid shadow-lg pt-3" width={150} height={150} />
            <h1 className="text-white text-center fw-semibold my-3 fw-bold">Explore high-quality, free stock photos</h1>
            <Form onSubmit={handleSearch} className="text-center mb-4 d-flex align-items-center justify-content-center mb-5">
              <Form.Control
                type="text"
                placeholder="Search for images"
                onChange={(e) => setQuery(e.target.value)}
                className="d-inline w-auto me-2"
              />
              <Button type="submit" disabled={loading} className="d-flex align-items-center btn btn-danger">
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Searching
                  </>
                ) : (
                  "Search"
                )}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>

      {/* Categories */}
      <Container className="mb-5">
        <Row className="text-center justify-content-center">
          <Col className="mb-3" lg="2" md="5">
            <div className="btn-class" onClick={() => categoryHandler("Animals")}>
              Animals
            </div>
          </Col>
          <Col className="mb-3" lg="2" md="5">
            <div className="btn-class art-btn" onClick={() => categoryHandler("Art")}>
              Art
            </div>
          </Col>
          <Col className="mb-3" lg="2" md="5">
            <div className="btn-class food-btn" onClick={() => categoryHandler("Food")}>
              Food
            </div>
          </Col>
          <Col className="mb-3" lg="2" md="5">
            <div className="btn-class quotes-btn" onClick={() => categoryHandler("Quotes")}>
              Quotes
            </div>
          </Col>
        </Row>
      </Container>

      {/* images */}
      <Container>
        <div className="mygrid mx-auto">
          {images.map((image, index) => (
            <div key={index} className="content flow">
              <img src={image.src.medium} alt={image.alt} className="img-fluid masonry-img" />
            </div>
          ))}
        </div>
      </Container>


    </>
  );
}
