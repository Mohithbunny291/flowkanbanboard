import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";

function Column({
  title,
  columnId,
  tasks,
  deleteTask,
  moveTask,
}) {
  return (
    <div className="column">
      <h2>{title}</h2>

      <Droppable droppableId={columnId}>
        {(provided) => (
          <div
            className="task-list"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks.length === 0 ? (
              <p className="empty">
                No tasks in this column
              </p>
            ) : (
              tasks.map((task, index) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  index={index}
                  columnId={columnId}
                  deleteTask={deleteTask}
                  moveTask={moveTask}
                />
              ))
            )}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default Column;