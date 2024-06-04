import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { CiSearch } from "react-icons/ci";
import axios from "axios";
import { IoIosClose } from "react-icons/io";
import Slider from "react-slick";
import Modal from "react-bootstrap/Modal";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "blue" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "blue" }}
      onClick={onClick}
    />
  );
}

function App() {
  const [movies, setMovies] = useState([]);
  const [show, setShow] = useState(false);
  const [movieSelected, setMovieSelected] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(4); // Number of movies to display per page

  const handleClose = () => setShow(false);
  const handleShow = (image, name, introduce, time, year) => {
    setMovieSelected({
      image,
      name,
      introduce,
      time,
      year,
    });
    setShow(true);
  };

  useEffect(() => {
    async function fetchData() {
      const data = await axios.get("http://localhost:5000/api/v1/movies", {
        withCredentials: true,
      });
      setMovies(data.data.data);
    }
    fetchData();
  }, []);

  // Pagination logic

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <GiHamburgerMenu />
        <div className="header_center">
          <p>MOVIE</p>
          <p className="h_c_icon">UI</p>
        </div>
        <CiSearch />
      </div>
      <div className="content py-3">
        <h3 className="py-2" style={{ textAlign: "left" }}>
          Most Popular Movies
        </h3>
        <div
          className="gap-3 w-100"
          style={{
            display: "grid",
            gridTemplateColumns: "25% 25% 25% 25%",
          }}
        >
          {currentMovies.map((movie, index) => (
            <div
              className="card w-100"
              style={{ borderRadius: "10px" }}
              onClick={() =>
                handleShow(
                  movie.image,
                  movie.name,
                  movie.introduce,
                  movie.time,
                  movie.year
                )
              }
              key={index}
            >
              <img
                src={movie.image}
                className="card-img-top"
                alt=""
                height={`300px`}
                width={`400px`}
                style={{ borderRadius: "10px" }}
              />
              <div
                className="card-body"
                style={{
                  textAlign: "left",
                }}
              >
                <h5 className="card-title">{movie.name}</h5>
                <span className="card-text" style={{ opacity: "0.5" }}>
                  {movie.time} min {movie.year}
                </span>
              </div>
            </div>
          ))}
        </div>
        {/* Pagination */}
        <div className="pagination">
          {Array.from({ length: Math.ceil(movies.length / moviesPerPage) }).map(
            (_, index) => (
              <button key={index} onClick={() => paginate(index + 1)}>
                {index + 1}
              </button>
            )
          )}
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <IoIosClose
          style={{
            cursor: "pointer",
            position: "absolute",
            zIndex: 100,
            right: "10px",
            top: "10px",
          }}
          onClick={handleClose}
        />
        <Modal.Body>
          <div className="d-flex gap-5" style={{ position: "relative" }}>
            <div sty>
              <img
                src={movieSelected.image}
                alt=""
                width={`100%`}
                style={{ objectFit: "contain", borderRadius: "8px" }}
              />
            </div>
            <div className="d-flex" style={{ flexDirection: "column" }}>
              <h1>{movieSelected.name}</h1>
              <span>
                {movieSelected.time} min {movieSelected.year}
              </span>
              <p>{movieSelected.introduce}</p>
              <button
                className="btn btn-primary"
                style={{ width: "fit-content" }}
              >
                PLAY MOVIE
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default App;
