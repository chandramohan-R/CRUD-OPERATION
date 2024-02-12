import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Form, Table, Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faSearch, faEdit, faTrash, faLink, faTh, faCalendar, faInfoCircle, faCog, faComment, faBell } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-svg-core/styles.css'; // Import the styles
import './SideNav.css'; // Add your custom styles if needed
import axios from 'axios';
import Calendar from 'react-calendar';


function SideNav() {
  const [tasks, setTasks] = useState(['']);
  const [editTask, setEditTask] = useState({ id: null, name: '', status: '' });
  const [newTask, setNewTask] = useState({ name: '', status: '' });
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeContent, setActiveContent] = useState('dashboard');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // You can add your logic to handle the form submission here
    console.log('Form submitted:', { name, email, message });
  };

  const formContainerStyle = {
    maxWidth: '600px',
    margin: 'auto',
    padding: '20px',
    textAlign: 'center',
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const inputStyle = {
    margin: '8px 0',
    padding: '8px',
    width: '100%',
    boxSizing: 'border-box',
  };

  const buttonStyle = {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };


  // Example: Events directly defined within the component
  const events = [
    { title: 'Event 1', date: new Date(2024, 1, 10) },
    { title: 'Event 2', date: new Date(2024, 1, 15) },
    { title: 'Event 3', date: new Date(2024, 1, 20) },
    { title: 'Event 4', date: new Date(2024, 1, 25) },
    { title: 'Event 5', date: new Date(2024, 1, 28) },
    // Add more events as needed
  ];


  const eventsOnSelectedDate = events.filter(event => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getDate() === selectedDate.getDate() &&
      eventDate.getMonth() === selectedDate.getMonth() &&
      eventDate.getFullYear() === selectedDate.getFullYear()
    );
  });


  const calendarContainerStyle = {
    maxWidth: '600px',
    margin: 'auto',
    padding: '20px',
    textAlign: 'center',
    backgroundColor: '#f5f5f5', // Example background color
    borderRadius: '12px', // Example border radius
    border: '1px solid #ddd', // Example border
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', // Example box shadow
  };

  const headerStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '16px',
  };

  const calendarStyle = {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '10px',
    backgroundColor: '#fff', // Example background color
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Example box shadow
  };

  const highlightedDateStyle = {
    animation: 'blink 1s infinite',
  };

  const eventListStyle = {
    listStyle: 'none',
    padding: '0',
  };

  const eventItemStyle = {
    padding: '8px',
    borderBottom: '1px solid #ccc',
  };

  const noEventsMessageStyle = {
    color: '#999',
  };
  const fetchTask = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tasks"); // Corrected protocol
      setTasks(response.data);
    } catch (error) {
      console.error('Error Fetching Task:', error);
    }
  }
  const createTask = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/tasks', newTask);
      setTasks([...tasks, response.data]);
      setNewTask({ name: '', status: '' });
      setShowCreateModal(false); // Close the create model after creating a task
      window.alert("Created Successfully")
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const updateTask = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/tasks/${editTask.id}`, {
        name: editTask.name,
        status: editTask.status,
      });
      setTasks(tasks.map((t) => (t._id === editTask.id ? response.data : t)));
      setShowEditModal(false);
      setEditTask({ id: null, name: '', status: '' });
      window.alert("Updated Successfully")
    } catch (error) {
      console.error('Error Updating Task:', error);
    }
  };
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`)
      setTasks(tasks.filter((task) => (task._id !== id)))
      window.alert("Deleted Successfully")
    }
    catch (error) {
      console.log('Error deleting task:', error)
    }
  }
  const handleEditButtonClick = (task) => {
    setEditTask({ id: task._id, name: task.name, status: task.status });
    setShowEditModal(true);
  };

  const handleDeleteButtonClick = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(id);
    }
  };

  useEffect(() => {
    fetchTask();  // <-- Corrected function name
  }, []);




  // Function to handle nav link clicks
  const handleNavLinkClick = (contentId) => {
    setActiveContent(contentId);
  };
  const containerStyle = {
    maxWidth: '800px',
    margin: 'auto',
    padding: '20px',
  };

  const sectionStyle = {
    marginBottom: '40px',
  };

  const titleStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '16px',
  };

  const descriptionStyle = {
    fontSize: '16px',
    lineHeight: '1.6',
  };



  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [roles, setRoles] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    position: '',
    department: '',
    role: '',
  });


  useEffect(() => {
    // Fetch employees, departments, and roles from the backend when the component mounts
    axios.get('http://localhost:5000/api/employees')
      .then(response => setEmployees(response.data))
      .catch(error => console.error(error));

    axios.get('http://localhost:5000/api/departments')
      .then(response => setDepartments(response.data))
      .catch(error => console.error(error));

    axios.get('http://localhost:5000/api/roles')
      .then(response => setRoles(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee((prevEmployee) => ({ ...prevEmployee, [name]: value }));
  };

  const addEmployee = () => {
    axios.post('http://localhost:5000/api/employees', newEmployee)
      .then(response => {
        setEmployees((prevEmployees) => [...prevEmployees, response.data]);
        setNewEmployee({ name: '', position: '', department: '', role: '' });
      })
      .catch(error => console.error(error));
  };


  const additionalDepartments = [
    { _id: '4', name: 'Human Resources' },
    { _id: '5', name: 'Marketing' },
    { _id: '6', name: 'IT' },
    { _id: '7', name: 'Operation' },
    { _id: '8', name: 'Sales' },
    { _id: '9', name: 'Designer' },

    // Add more departments as needed
  ];

  const allDepartments = [...departments, ...additionalDepartments];

  const additionalRoles = [
    { _id: '4', name: 'Manager' },
    { _id: '5', name: 'Analyst' },
    { _id: '6', name: 'Designer' },
    { _id: '7', name: 'Team Leader' },
    { _id: '8', name: 'Associate Officer' },
    // Add more roles as needed
  ];

  const allRoles = [...roles, ...additionalRoles];


  return (
    <div id="viewport">
      {/* Sidebar */}
      <div id="sidebar">
        <header>
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#">My App</Navbar.Brand>
          </Navbar>
        </header>
        <Nav className="flex-column">
          <Nav.Link href="#" onClick={() => handleNavLinkClick('dashboard')}
            active={activeContent === 'dashboard'}
          >
            <FontAwesomeIcon icon={faTachometerAlt} /> Dashboard
          </Nav.Link>
          <Nav.Link href="#" onClick={() => handleNavLinkClick('shortcuts')}
            active={activeContent === 'shortcuts'}
          >
            <FontAwesomeIcon icon={faLink} /> Employees
          </Nav.Link>
          
          <Nav.Link href="#" onClick={() => handleNavLinkClick('events')}
            active={activeContent === 'events'}
          >
            <FontAwesomeIcon icon={faCalendar} /> Events
          </Nav.Link>
          <Nav.Link href="#" onClick={() => handleNavLinkClick('about')}
            active={activeContent === 'about'}
          >
            <FontAwesomeIcon icon={faInfoCircle} /> About
          </Nav.Link>
          <Nav.Link href="#" onClick={() => handleNavLinkClick('service')}
            active={activeContent === 'service'}
          >
            <FontAwesomeIcon icon={faCog} /> Services
          </Nav.Link>
          <Nav.Link href="#" onClick={() => handleNavLinkClick('contact')}
            active={activeContent === 'contact'}
          >
            <FontAwesomeIcon icon={faComment} /> Contact
          </Nav.Link>
        </Nav>
      </div>

      {/* Content */}
      <div id="content">
        <Navbar bg="light" expand="lg">
          <Container fluid>
            <Navbar.Collapse className="justify-content-start">
              <Nav>

                <Nav.Link href="#">TASK MANAGEMENT</Nav.Link>
              </Nav>
            </Navbar.Collapse>
            <Navbar.Collapse className="justify-content-end">
              <Nav>
                <Nav.Link href="#">
                  <FontAwesomeIcon icon={faBell} className="text-danger" />
                </Nav.Link>
                <Nav.Link href="#">Test User</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Container fluid>
          <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Create Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* Form to input task details */}
              <Form.Group controlId="createTaskName">
                <Form.Label>Task Name</Form.Label>
                <Form.Control
                  type="text"
                  value={newTask.name}
                  onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="createTaskStatus">
                <Form.Label>Status</Form.Label>
                <Form.Control
                  type="text"
                  value={newTask.status}
                  onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
                Close
              </Button>
              <Button variant="primary" onClick={createTask}>
                Create Task
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group controlId="editTaskName">
                <Form.Label>Task Name</Form.Label>
                <Form.Control
                  type="text"
                  value={editTask.name}
                  onChange={(e) => setEditTask({ ...editTask, name: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="editTaskStatus">
                <Form.Label>Status</Form.Label>
                <Form.Control
                  type="text"
                  value={editTask.status}
                  onChange={(e) => setEditTask({ ...editTask, status: e.target.value })}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                Close
              </Button>
              <Button variant="primary" onClick={updateTask}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Display different content based on the activeContent state */}
          {activeContent === 'dashboard' && (
            <div>
              <Container className='dashcontent' fluid>


                <div className='d-flex justify-content-end mt-2 mb-2'>
                  <Button variant="success" size="sm" onClick={() => setShowCreateModal(true)} className="ml-2">
                    <FontAwesomeIcon icon={faEdit} /> Create Task
                  </Button>

                </div>

                {/* Task Table */}
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Task Name</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tasks.map((task, index) => (
                      <tr key={task.id || index}>
                        <td>{task._id}</td>
                        <td>{task.name}</td>
                        <td>{task.status}</td>
                        <td className='Action'>
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handleEditButtonClick(task)}
                            className="mr-2"
                          >
                            <FontAwesomeIcon
                              icon={faEdit}
                            /> Edit
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDeleteButtonClick(task._id)}
                          >
                            <FontAwesomeIcon
                              icon={faTrash}
                            /> Delete
                          </Button>
                        </td>
                      </tr>
                    ))}

                  </tbody>
                </Table>
              </Container>
            </div>
          )}
          {activeContent === 'shortcuts' && (
            <div className="container mt-5">
              <h2 className="mb-4">Employee Management System</h2>
              <div className="row">
                <div className="col-md-6">
                  <h3>Add New Employee</h3>
                  <form>
                    <div className="mb-3">
                      <label className="form-label">Name:</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={newEmployee.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Position:</label>
                      <input
                        type="text"
                        className="form-control"
                        name="position"
                        value={newEmployee.position}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Department:</label>
                      <select
                        className="form-control"
                        name="department"
                        value={newEmployee.department}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Department</option>
                        {allDepartments.map((department) => (
                          <option key={department._id} value={department.name}>
                            {department.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Role:</label>
                      <select
  className="form-control"
  name="role"
  value={newEmployee.role}
  onChange={handleInputChange}
>
  <option value="">Select Role</option>
  {allRoles.map((role) => (
    <option key={role._id} value={role.name}>
      {role.name}
    </option>
  ))}
</select>
                    </div>
                    <button type="button" className="btn btn-primary" onClick={addEmployee}>
                      Add Employee
                    </button>
                  </form>
                </div>
                <div className="col-md-6">
                  <h3>Employee List</h3>
                  <ul className="list-group">
                    {employees.map((employee) => (
                      <li key={employee._id} className="list-group-item">
                        <strong>{employee.name}</strong>
                        <br />
                        {employee.position}
                        <br />
                        <span className="badge bg-info me-1">{employee.department}</span>
                        <span className="badge bg-secondary">{employee.role}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
          
          {activeContent === 'events' && (
            <div style={calendarContainerStyle}>
              <style>
                {`
                 @keyframes blink {
                   0%, 50%, 100% {
                     background-color: transparent;
                   }
                   25%, 75% {
                     background-color: #8eff8e;
                   }
                 }
       
                 .blink {
                   animation: blink 4s infinite;
                 }
               `}
              </style>
              <h2 style={headerStyle}>Event Calendar</h2>
              <div style={calendarStyle}>
                <Calendar
                  onChange={setSelectedDate}
                  value={selectedDate}
                  tileClassName={({ date }) => {
                    const isEventDate = eventsOnSelectedDate.some(
                      (event) =>
                        new Date(event.date).toDateString() === date.toDateString()
                    );
                    return isEventDate ? 'blink' : '';
                  }}
                />
              </div>
              <div>
                <h3>Events on {selectedDate.toDateString()}:</h3>
                {eventsOnSelectedDate.length > 0 ? (
                  <ul style={eventListStyle}>
                    {eventsOnSelectedDate.map((event) => (
                      <li key={event.title} style={eventItemStyle}>
                        {event.title}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p style={noEventsMessageStyle}>No events for this date.</p>
                )}
              </div>
            </div>
          )}

          {activeContent === 'about' && (
            <div>
              <h1>About Content</h1>
              <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', padding: '40px 0' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                  <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '20px', color: '#007bff' }}>
                    About Our Company
                  </h1>
                  <p style={{ fontSize: '18px', lineHeight: '1.6', color: '#555' }}>
                    Welcome to Task Manager Application, where innovation meets excellence. We are committed to
                    delivering high-quality products/services that meet the needs of our customers.
                  </p>
                  <h2 style={{ fontSize: '28px', fontWeight: 'bold', margin: '30px 0 20px', color: '#333' }}>
                    Our Mission
                  </h2>
                  <p style={{ fontSize: '18px', lineHeight: '1.6', color: '#555' }}>
                    To [describe your mission - e.g., "Empower businesses through cutting-edge technology."].
                  </p>
                  <h2 style={{ fontSize: '28px', fontWeight: 'bold', margin: '30px 0 20px', color: '#333' }}>
                    Our Vision
                  </h2>
                  <p style={{ fontSize: '18px', lineHeight: '1.6', color: '#555' }}>
                    To be a leader in [industry/field] by [describe your vision - e.g., "providing innovative
                    solutions and unparalleled customer satisfaction."].
                  </p>
                  <h2 style={{ fontSize: '28px', fontWeight: 'bold', margin: '30px 0 20px', color: '#333' }}>
                    Our Values
                  </h2>
                  <ul style={{ listStyleType: 'none', fontSize: '18px', lineHeight: '1.6', color: '#555' }}>
                    <li>Customer Satisfaction</li>
                    <li>Innovation</li>
                    <li>Integrity</li>
                    <li>Teamwork</li>
                  </ul>
                  <h2 style={{ fontSize: '28px', fontWeight: 'bold', margin: '30px 0 20px', color: '#333' }}>
                    Our History
                  </h2>
                  <p style={{ fontSize: '18px', lineHeight: '1.6', color: '#555' }}>
                    Task Manager Application was founded in [year] with the goal of [briefly describe the
                    company's history and establishment].
                  </p>
                  <h2 style={{ fontSize: '28px', fontWeight: 'bold', margin: '30px 0 20px', color: '#333' }}>
                    Meet Our Team
                  </h2>
                  <p style={{ fontSize: '18px', lineHeight: '1.6', color: '#555' }}>
                    At [Your Company Name], we have a dedicated team of professionals who are passionate about
                    [industry/mission]. Meet the individuals who drive our success.
                  </p>
                  {/* Add team members or any additional content here */}
                </div>
              </div>
            </div>
          )}
          {activeContent === 'service' && (
            <div>
              <h1>Service Content</h1>
              <div style={containerStyle}>
                <section style={sectionStyle}>
                  <h2 style={titleStyle}>Web Development</h2>
                  <p style={descriptionStyle}>
                    We offer cutting-edge web development services to help your business establish a strong online presence. Our team of experienced developers utilizes the latest technologies to create responsive and user-friendly websites tailored to your specific needs.
                  </p>
                </section>

                <section style={sectionStyle}>
                  <h2 style={titleStyle}>Mobile App Development</h2>
                  <p style={descriptionStyle}>
                    Transform your ideas into functional and feature-rich mobile applications. Our skilled app developers use industry best practices to build custom solutions for iOS and Android platforms, ensuring a seamless user experience.
                  </p>
                </section>

                <section style={sectionStyle}>
                  <h2 style={titleStyle}>Digital Marketing</h2>
                  <p style={descriptionStyle}>
                    Boost your online presence and reach your target audience with our digital marketing services. From search engine optimization (SEO) to social media management, we provide comprehensive solutions to help your business thrive in the digital landscape.
                  </p>
                </section>
              </div>
            </div>
          )}
          {activeContent === 'contact' && (
            <div>
              <h1>Contact Content</h1>
              <div style={formContainerStyle}>
                <h2>Contact Us</h2>
                <form style={formStyle} onSubmit={handleSubmit}>
                  <input
                    type="text"
                    placeholder="Your Name"
                    style={inputStyle}
                    value={name}
                    onChange={handleNameChange}
                    required
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    style={inputStyle}
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                  <textarea
                    placeholder="Your Message"
                    style={inputStyle}
                    value={message}
                    onChange={handleMessageChange}
                    required
                  />
                  <button type="submit" style={buttonStyle}>
                    Submit
                  </button>
                </form>
              </div>
            </div>
          )}
          {/* Add similar sections for other content */}
        </Container>
      </div>
    </div>
  );
}

export default SideNav;
