import { Draggable } from "@hello-pangea/dnd";

function TaskCard({
  task,
  index,
  columnId,
  deleteTask,
  moveTask,
}) {
  const columns = ["todo", "inprogress", "done"];

  const nextColumn = () => {
    const currentIndex = columns.indexOf(columnId);

    if (currentIndex < columns.length - 1) {
      moveTask(columnId, columns[currentIndex + 1], task.id);
    }
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          className="task-card"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <h3>{task.title}</h3>
          <p>{task.description}</p>

          <div className="task-actions">
            <button onClick={nextColumn}>Move</button>
            <button onClick={() => deleteTask(columnId, task.id)}>
              Delete
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default TaskCard;