import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";
import { Task, TasksState } from "../types";

interface ColumnProps {
  title: string;
  columnId: keyof TasksState;
  tasks: Task[];
  deleteTask: (
    columnId: keyof TasksState,
    taskId: string
  ) => void;
  moveTask: () => void;
}

function Column({
  title,
  columnId,
  tasks,
  deleteTask,
}: ColumnProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <h2 className="text-2xl font-bold mb-4">
        {title}
      </h2>

      <Droppable droppableId={columnId}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="min-h-[300px]"
          >
            {tasks.length === 0 ? (
              <p className="text-gray-400 text-center mt-10">
                No tasks in this column
              </p>
            ) : (
              tasks.map(
                (
                  task: Task,
                  index: number
                ) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    index={index}
                    columnId={columnId}
                    deleteTask={deleteTask}
                  />
                )
              )
            )}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default Column;