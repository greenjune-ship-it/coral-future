import Carousel from 'react-bootstrap/Carousel';


function UncontrolledCarousel() {
  return (
    <Carousel //style={{height: '600px', width: "1300px", transform: 'translateX(22.5%)'}}
    >
      <Carousel.Item>
      <img
          className="d-block w-100"
          src={require('./first.jpeg')}
          alt="First slide"
          
        />
        <Carousel.Caption style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', borderRadius: '100px' }}>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default UncontrolledCarousel;