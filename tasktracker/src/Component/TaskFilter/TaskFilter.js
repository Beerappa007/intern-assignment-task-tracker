import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BsFilter } from "react-icons/bs";
import { FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";
import "./TaskFilter.css";

function TaskFilter({ tasks, setTasks, filterTasksByPriority, resetTasks }) {
  const [filters, setFilters] = useState({
    assignee: "",
    priority: "",
    startDate: null,
    endDate: null,
  });

  const handleFilterChange = (name, value) => {
    // Reset tasks to display original cards if assignee filter is cleared
    if (name === "assignee" && value === "") {
      resetTasks();
      setFilters({ ...filters, assignee: "" }); // Clear assignee filter in state
    } else {
      const newFilters = { ...filters, [name]: value };
      setFilters(newFilters);
      applyFilters(newFilters);
    }
  };

  //filter statements for  each filter option;
  const applyFilters = (filters) => {
    if (!tasks) return;

    let filteredTasks = tasks;
    let dateFilterApplied = false; // Flag to check if date filter is applied

    if (filters.assignee) {
      filteredTasks = filteredTasks.filter((task) =>
        task.assignee.toLowerCase().includes(filters.assignee.toLowerCase())
      );
    }
    if (filters.priority) {
      filteredTasks = filteredTasks.filter(
        (task) => task.priority === filters.priority
      );
    }
    if (filters.startDate && filters.endDate) {
      filteredTasks = filteredTasks.filter((task) => {
        const taskStartDate = new Date(task.startDate);
        const taskEndDate = task.endDate ? new Date(task.endDate) : null;
        const startDate = new Date(filters.startDate);
        const endDate = new Date(filters.endDate);

        // Check if the date range filter is applied
        dateFilterApplied = true;

        return (
          taskStartDate >= startDate && (!taskEndDate || taskEndDate <= endDate)
        );
      });
    }

    // Check if any filter other than the date filter is applied and if the date filter is not applied
    if (
      (filters.assignee || filters.priority) &&
      !dateFilterApplied &&
      (filters.startDate || filters.endDate)
    ) {
      alert("Please enter both start and end dates for date filtering.");
      return;
    }

    setTasks(filteredTasks);
  };

  //sort by priority
  const handleSortChange = (property, order) => {
    if (!tasks) return;

    const sortedTasks = [...tasks].sort((a, b) => {
      if (order === "ascending") {
        return a[property] > b[property] ? 1 : -1;
      } else {
        return a[property] < b[property] ? 1 : -1;
      }
    });
    setTasks(sortedTasks);
  };

  const handlePriorityFilter = (priority) => {
    if (!priority) {
      alert("Please select a priority before applying the filter.");
      return;
    }
    filterTasksByPriority(priority);
  };

  const handleResetFilters = () => {
    resetTasks();
    setFilters({
      assignee: "",
      priority: "",
      startDate: null,
      endDate: null,
    });
  };

  return (
    <div className="task-filter">
      {/* Filter by assignee */}
      {/* <div className="filter-option"> */}
      <div className="first-half">
        <label htmlFor="assignee">
          <strong>Filter by :</strong>
        </label>
        <BsFilter className="filter-icon" />
        <input
          type="text"
          id="assignee"
          name="assignee"
          placeholder="Assignee Name"
          value={filters.assignee || ""}
          onChange={(e) => handleFilterChange("assignee", e.target.value)}
        />
        {/* </div> */}
        {/* Filter by priority */}
        {/* <div className="filter-option"> */}
        <select
          id="priority"
          name="priority"
          value={filters.priority || ""}
          onChange={(e) => handleFilterChange("priority", e.target.value)}
        >
          <option value="">Filter by Priority</option>
          <option value="P0">P0</option>
          <option value="P1">P1</option>
          <option value="P2">P2</option>
        </select>
        <button onClick={() => handlePriorityFilter(filters.priority)}>
          Apply Priority Filter
        </button>
      </div>
      <div className="second-half">
        {/* </div> */}
        {/* Date range input */}
        {/* <div className="filter-option"> */}
        <label htmlFor="dateRange"></label>
        {/* <div> */}
        <DatePicker
          selected={filters.startDate}
          onChange={(date) => handleFilterChange("startDate", date)}
          selectsStart
          startDate={filters.startDate}
          endDate={filters.endDate}
          placeholderText="Start Date"
          dateFormat="dd/MM/yyyy"
        />
        <span className="date-separator">-</span>
        <DatePicker
          selected={filters.endDate}
          onChange={(date) => handleFilterChange("endDate", date)}
          selectsEnd
          startDate={filters.startDate}
          endDate={filters.endDate}
          placeholderText="End Date"
          dateFormat="dd/MM/yyyy"
          minDate={filters.startDate}
        />
        {/* </div> */}
        {/* </div> */}
        {/* Sort options */}
        {/* <div className="sort-option"> */}
        <label htmlFor="sortPriority">
          <strong>Sort Priority:</strong>
        </label>
        <FaSortAlphaDown
          className="sort-icon"
          onClick={() => handleSortChange("priority", "ascending")}
        />
        <FaSortAlphaUp
          className="sort-icon"
          onClick={() => handleSortChange("priority", "descending")}
        />
        {/* Add more sort options if needed */}
        {/* </div> */}
        {/* Reset filters button */}
        <button onClick={handleResetFilters}>Reset Filters</button>
      </div>
    </div>
  );
}

export default TaskFilter;
