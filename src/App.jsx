import { useEffect, useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import Column from "./components/Column";
import TaskForm from "./components/TaskForm";
import "./index.css";

const initialData = {
  todo: [],
  inprogress: [],
  done: [],
};

const columnLabels = {
  todo: "To Do",
  inprogress: "In Progress",
  done: "Done",
};

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("kanbanTasks");
    return saved ? JSON.parse(saved) : initialData;
  });

  useEffect(() => {
    localStorage.setItem("kanbanTasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title, description) => {
    const newTask = {
      id: Date.now().toString(),
      title,
      description,
    };

    setTasks((prev) => ({
      ...prev,
      todo: [...prev.todo, newTask],
    }));
  };

  const deleteTask = (columnId, taskId) => {
    setTasks((prev) => ({
      ...prev,
      [columnId]: prev[columnId].filter((task) => task.id !== taskId),
    }));
  };

  const moveTask = (sourceCol, destCol, taskId) => {
    if (sourceCol === destCol) return;

    const task = tasks[sourceCol].find((t) => t.id === taskId);

    if (!task) return;

    setTasks((prev) => ({
      ...prev,
      [sourceCol]: prev[sourceCol].filter((t) => t.id !== taskId),
      [destCol]: [...prev[destCol], task],
    }));
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceCol = source.droppableId;
    const destCol = destination.droppableId;

    if (sourceCol === destCol) {
      const updated = Array.from(tasks[sourceCol]);
      const [moved] = updated.splice(source.index, 1);

      updated.splice(destination.index, 0, moved);

      setTasks((prev) => ({
        ...prev,
        [sourceCol]: updated,
      }));

      return;
    }

    const sourceItems = Array.from(tasks[sourceCol]);
    const destItems = Array.from(tasks[destCol]);

    const [moved] = sourceItems.splice(source.index, 1);

    destItems.splice(destination.index, 0, moved);

    setTasks((prev) => ({
      ...prev,
      [sourceCol]: sourceItems,
      [destCol]: destItems,
    }));
  };

  return (
    <div className="app">
      <h1>Flow Kanban Board</h1>

      <TaskForm addTask={addTask} />

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="board">
          {Object.entries(columnLabels).map(([columnId, title]) => (
            <Column
              key={columnId}
              columnId={columnId}
              title={title}
              tasks={tasks[columnId]}
              deleteTask={deleteTask}
              moveTask={moveTask}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}

export default App;