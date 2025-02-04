import { Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link
                to="/Kambaz/Courses/1234/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <Card.Img
                  variant="top"
                  src="/images/coding.jpeg"
                  width="100%"
                  height={160}
                />
                <Card.Body>
                  <Card.Title> CS1234 React JS </Card.Title>
                  <Card.Text className="wd-dashboard-course-title">
                    Full Stack software developer{" "}
                  </Card.Text>
                  <Button variant="primary"> Go </Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link
                to="/Kambaz/Courses/1234/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <Card.Img
                  variant="top"
                  src="/images/coding.jpeg"
                  width="100%"
                  height={160}
                />
                <Card.Body>
                  <Card.Title> CS5800 </Card.Title>
                  <Card.Text className="wd-dashboard-course-title">
                    Algorithms{" "}
                  </Card.Text>
                  <Button variant="primary"> Go </Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link
                to="/Kambaz/Courses/1234/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <Card.Img
                  variant="top"
                  src="/images/coding.jpeg"
                  width="100%"
                  height={160}
                />
                <Card.Body>
                  <Card.Title> CS5010 </Card.Title>
                  <Card.Text className="wd-dashboard-course-title">
                    Programming Design Paradigm{" "}
                  </Card.Text>
                  <Button variant="primary"> Go </Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link
                to="/Kambaz/Courses/1234/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <Card.Img
                  variant="top"
                  src="/images/coding.jpeg"
                  width="100%"
                  height={160}
                />
                <Card.Body>
                  <Card.Title> CS5800 </Card.Title>
                  <Card.Text className="wd-dashboard-course-title">
                    Building Scalable Distributed Systems{" "}
                  </Card.Text>
                  <Button variant="primary"> Go </Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link
                to="/Kambaz/Courses/1234/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <Card.Img
                  variant="top"
                  src="/images/coding.jpeg"
                  width="100%"
                  height={160}
                />
                <Card.Body>
                  <Card.Title> CS5200 </Card.Title>
                  <Card.Text className="wd-dashboard-course-title">
                    Database Management Systems{" "}
                  </Card.Text>
                  <Button variant="primary"> Go </Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link
                to="/Kambaz/Courses/1234/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <Card.Img
                  variant="top"
                  src="/images/coding.jpeg"
                  width="100%"
                  height={160}
                />
                <Card.Body>
                  <Card.Title> CS5610 </Card.Title>
                  <Card.Text className="wd-dashboard-course-title">
                    Web Development{" "}
                  </Card.Text>
                  <Button variant="primary"> Go </Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link
                to="/Kambaz/Courses/1234/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <Card.Img
                  variant="top"
                  src="/images/coding.jpeg"
                  width="100%"
                  height={160}
                />
                <Card.Body>
                  <Card.Title> CS6620 </Card.Title>
                  <Card.Text className="wd-dashboard-course-title">
                    Cloud Computing{" "}
                  </Card.Text>
                  <Button variant="primary"> Go </Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}
