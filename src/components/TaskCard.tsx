import { Draggable } from "@hello-pangea/dnd";
import { Task, TasksState } from "../types";

interface TaskCardProps {
  task: Task;
  index: number;
  columnId: keyof TasksState;
  deleteTask: (
    columnId: keyof TasksState,
    taskId: string
  ) => void;
}

function TaskCard({
  task,
  index,
  columnId,
  deleteTask,
}: TaskCardProps) {
  return (
    <Draggable
      draggableId={task.id}
      index={index}
    >
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-slate-100 p-4 rounded-xl shadow mb-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
        >
          <h3 className="text-lg font-bold">
            {task.title}
          </h3>

          <p className="text-gray-600 mt-2">
            {task.description}
          </p>

          <div className="mt-4 flex justify-end">
            <button
              onClick={() =>
                deleteTask(
                  columnId,
                  task.id
                )
              }
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default TaskCard;