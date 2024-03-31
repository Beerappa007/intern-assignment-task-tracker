import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import './Addtask.css';

function AddTask({ addNewTask }) {
  const [show, setShow] = useState(false);
  const [filters, setFilters] = useState({});
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [team, setTeam] = useState('');

  const handleClose = () => {
    const assignee = filters.assignee || '';
    const priority = filters.priority || '';
    const newTask = { id: Date.now(), title, description, assignee, priority, team }; // Assign a unique ID to the new task
    addNewTask(newTask); // Call addNewTask function with the new task
    setShow(false);
  };

  const handleShow = () => setShow(true);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow} className="add-task-btn">
        Add new Task
      </Button>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Enter title" autoFocus value={title} onChange={(e) => setTitle(e.target.value)} required/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" placeholder="Enter description" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} required/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicTeam">
              <Form.Label>Team</Form.Label>
              <Form.Control type="text" placeholder="Enter team" value={team} onChange={(e) => setTeam(e.target.value)} required/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicAssignee">
              <Form.Label>Assignee</Form.Label>
              <Form.Control type="text" placeholder="Enter assignee" name="assignee" value={filters.assignee || ''} onChange={handleFilterChange} required/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPriority">
              <Form.Label>Priority</Form.Label>
              <Form.Select name="priority" value={filters.priority || ''} onChange={handleFilterChange} required>
                <option value="">Select Priority</option>
                <option value="P0">P0</option>
                <option value="P1">P1</option>
                <option value="P2">P2</option>
              </Form.Select>
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Add Task
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddTask;
