import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { BsThreeDotsVertical } from "react-icons/bs";

import TaskFilter from "../Component/TaskFilter/TaskFilter";
import AddTask from "../Component/Addtask/Addtask";
import "./Interface.css";

function Interface() {
  const [tasks, setTasks] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [editedTask, setEditedTask] = useState(null);
  const [originalTasks, setOriginalTasks] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      const initialTasks = storedTasks.map((task) => ({ ...task }));
      console.log("Initial Tasks:", initialTasks); // Log initial tasks with status
      setTasks(initialTasks);
      setOriginalTasks(initialTasks);
    } else {
      console.log("No tasks found in local storage.");
      setTasks([]);
      setOriginalTasks([]);
    }
  }, []);

  const addNewTask = (newTask) => {
    newTask.status = "Pending"; // Set status to 'Pending' for newly added task
    newTask.startDate = new Date(); // Set start date to current date
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const filterTasksByPriority = (priority) => {
    const filteredTasks = originalTasks.filter(
      (task) => task.priority === priority
    );
    setTasks(filteredTasks);
  };

  const resetTasks = () => {
    setTasks(originalTasks);
  };

  const handleStatusChange = (taskId, newStatus) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        const updatedTask = { ...task, status: newStatus };
        if (newStatus === "Completed") {
          updatedTask.endDate = new Date(); // Set end date to current date when task is completed
        }
        return updatedTask;
      }
      return task;
    });

    console.log("Updated Tasks:", updatedTasks); // Log updated tasks

    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Update local storage
  };

  const handleEditModalOpen = (task) => {
    setSelectedTask(task);
    setEditedTask({ ...task });
    setShowEditModal(true);
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
    setEditedTask(null);
  };

  const handleDeleteModalOpen = (task) => {
    setSelectedTask(task);
    setShowDeleteModal(true);
  };

  const handleDeleteModalClose = () => {
    setShowDeleteModal(false);
  };

  const handleEdit = () => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === editedTask.id) {
        return { ...editedTask };
      }
      return task;
    });
    console.log("Updated Tasks after edit:", updatedTasks); // Log updated tasks after edit

    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    handleEditModalClose();
  };

  const handleDelete = () => {
    const updatedTasks = tasks.filter((task) => task.id !== selectedTask.id);
    console.log("Updated Tasks after delete:", updatedTasks); // Log updated tasks after delete

    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    handleDeleteModalClose();
  };

  return (
    <div className="interface-container">
      <div className="interface-header">
        <div className="add-task-btn">
          <AddTask addNewTask={addNewTask} />
        </div>
        <div className="task-filters">
          <TaskFilter
            tasks={tasks}
            setTasks={setTasks}
            filterTasksByPriority={filterTasksByPriority}
            resetTasks={resetTasks}
          />
        </div>
      </div>

      <div className="task-cards">
        <div className="task-list">
          <Card className="main-card mb-3">
            <Card.Body className="task-card-body custom-dropdown-menu">
              <h3>
                <Badge bg="warning" className="card-badge">
                  Pending
                </Badge>
              </h3>
              {tasks
                .filter((task) => task.status === "Pending")
                .map((task) => (
                  <div key={task.id}>
                    <TaskCard
                      task={task}
                      onEdit={handleEditModalOpen}
                      onDelete={handleDeleteModalOpen}
                      onStatusChange={handleStatusChange}
                    />
                  </div>
                ))}
            </Card.Body>
          </Card>

          <Card className="main-card mb-3">
            <Card.Body className="task-card-body custom-dropdown-menu">
              <h3>
                <Badge bg="primary" className="card-badge">
                  In Progress
                </Badge>
              </h3>
              {tasks
                .filter((task) => task.status === "In Progress")
                .map((task) => (
                  <div key={task.id}>
                    <TaskCard
                      task={task}
                      onEdit={handleEditModalOpen}
                      onDelete={handleDeleteModalOpen}
                      onStatusChange={handleStatusChange}
                    />
                  </div>
                ))}
            </Card.Body>
          </Card>

          <Card className="main-card mb-3">
            <Card.Body className="task-card-body custom-dropdown-menu">
              <h3>
                <Badge bg="success" className="card-badge">
                  Completed
                </Badge>
              </h3>
              {tasks
                .filter((task) => task.status === "Completed")
                .map((task) => (
                  <div key={task.id}>
                    <TaskCard
                      task={task}
                      onEdit={handleEditModalOpen}
                      onDelete={handleDeleteModalOpen}
                      onStatusChange={handleStatusChange}
                    />
                  </div>
                ))}
            </Card.Body>
          </Card>

          <Card className="main-card mb-3">
            <Card.Body className="task-card-body custom-dropdown-menu">
              <h3>
                <Badge bg="info" className="card-badge">
                  Deployed
                </Badge>
              </h3>
              {tasks
                .filter((task) => task.status === "Deployed")
                .map((task) => (
                  <div key={task.id}>
                    <TaskCard
                      task={task}
                      onEdit={handleEditModalOpen}
                      onDelete={handleDeleteModalOpen}
                      onStatusChange={handleStatusChange}
                    />
                  </div>
                ))}
            </Card.Body>
          </Card>

          <Card className="main-card mb-3">
            <Card.Body className="task-card-body custom-dropdown-menu">
              <h3>
                <Badge bg="danger" className="card-badge">
                  Deferred
                </Badge>
              </h3>
              {tasks
                .filter((task) => task.status === "Deferred")
                .map((task) => (
                  <div key={task.id}>
                    <TaskCard
                      task={task}
                      onEdit={handleEditModalOpen}
                      onDelete={handleDeleteModalOpen}
                      onStatusChange={handleStatusChange}
                    />
                  </div>
                ))}
            </Card.Body>
          </Card>
        </div>
      </div>

      <Modal show={showEditModal} onHide={handleEditModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="editFormTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={editedTask ? editedTask.title : ""}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, title: e.target.value })
                }
                disabled
              />
            </Form.Group>
            <Form.Group controlId="editFormDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={editedTask ? editedTask.description : ""}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, description: e.target.value })
                }
                disabled
              />
            </Form.Group>
            <Form.Group controlId="editFormAssignee">
              <Form.Label>Assignee</Form.Label>
              <Form.Control
                type="text"
                value={editedTask ? editedTask.assignee : ""}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, assignee: e.target.value })
                }
                disabled
              />
            </Form.Group>
            <Form.Group controlId="editFormTeam">
              <Form.Label>Team</Form.Label>
              <Form.Control
                type="text"
                value={editedTask ? editedTask.team : ""}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, team: e.target.value })
                }
                disabled
              />
            </Form.Group>
            <Form.Group controlId="editFormPriority">
              <Form.Label>Priority</Form.Label>
              <Form.Control
                as="select"
                value={editedTask ? editedTask.priority : ""}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, priority: e.target.value })
                }
              >
                <option value="P0">P0</option>
                <option value="P1">P1</option>
                <option value="P2">P2</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="editFormStatus">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={editedTask ? editedTask.status : ""}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, status: e.target.value })
                }
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Deployed">Deployed</option>
                <option value="Deferred">Deferred</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEdit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteModal} onHide={handleDeleteModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this task?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteModalClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

const TaskCard = ({ task, onEdit, onDelete, onStatusChange }) => {
  const handleEditClick = () => {
    onEdit(task);
  };

  const handleDeleteClick = () => {
    onDelete(task);
  };

  const getButtonLabel = () => {
    switch (task.status) {
      case "Pending":
        return "Assign";
      case "In Progress":
        return "In Progress";
      default:
        return task.status;
    }
  };

  return (
    <Card>
      <Card.Body className="task-card-body">
        <div className="title-priority">
          <span>Title: {task.title}</span>
          <span className="priority-icon">
            {getPriorityIcon(task.priority)}
          </span>
        </div>
        <hr />
        <p className="card-text">Description: {task.description}</p>
        <div className="mb-2 text-muted assignee-button-group">
          <span>Assignee: {task.assignee}</span>
          <span>Team: {task.team}</span>
          <div>
            <Button variant="outline-secondary">{getButtonLabel()}</Button>
          </div>
        </div>
        {/* 3dots button */}
        <div className="vertical-dots">
          <BsThreeDotsVertical />
          <ul className="dropdown-menu">
            <li onClick={handleEditClick}>Edit</li>
            <li onClick={handleDeleteClick}>Delete</li>
          </ul>
        </div>
      </Card.Body>
    </Card>
  );
};

// const getStatusColor = (status) => {
//   switch (status) {
//     case 'Assignee':
//       return 'secondary';
//     case 'Pending':
//       return 'warning';
//     case 'In Progress':
//       return 'primary';
//     case 'Completed':
//       return 'success';
//     case 'Deployed':
//       return 'info';
//     case 'Deferred':
//       return 'danger';
//     default:
//       return 'secondary';
//   }
// };

const getPriorityIcon = (priority) => {
  return priority;
};

export default Interface;
