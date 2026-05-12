import { useEffect, useReducer } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import Column from "./components/Column";
import TaskForm from "./components/TaskForm";
import { Task, TasksState } from "./types";

const initialState: TasksState = {
  todo: [],
  inprogress: [],
  done: [],
};

const columnLabels = {
  todo: "To Do",
  inprogress: "In Progress",
  done: "Done",
};

type Action =
  | {
      type: "ADD_TASK";
      payload: Task;
    }
  | {
      type: "DELETE_TASK";
      payload: {
        columnId: keyof TasksState;
        taskId: string;
      };
    }
  | {
      type: "SET_TASKS";
      payload: TasksState;
    };

function reducer(
  state: TasksState,
  action: Action
): TasksState {
  switch (action.type) {
    case "ADD_TASK":
      return {
        ...state,
        todo: [...state.todo, action.payload],
      };

    case "DELETE_TASK":
      return {
        ...state,
        [action.payload.columnId]:
          state[action.payload.columnId].filter(
            (task) =>
              task.id !== action.payload.taskId
          ),
      };

    case "SET_TASKS":
      return action.payload;

    default:
      return state;
  }
}

function App() {
  const saved =
    localStorage.getItem("kanbanTasks");

  const [tasks, dispatch] = useReducer(
    reducer,
    saved
      ? JSON.parse(saved)
      : initialState
  );

  useEffect(() => {
    localStorage.setItem(
      "kanbanTasks",
      JSON.stringify(tasks)
    );
  }, [tasks]);

  const addTask = (
    title: string,
    description: string
  ) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
    };

    dispatch({
      type: "ADD_TASK",
      payload: newTask,
    });
  };

  const deleteTask = (
    columnId: keyof TasksState,
    taskId: string
  ) => {
    dispatch({
      type: "DELETE_TASK",
      payload: {
        columnId,
        taskId,
      },
    });
  };

  const onDragEnd = (
    result: DropResult
  ) => {
    const { source, destination } =
      result;

    if (!destination) return;

    const sourceCol =
      source.droppableId as keyof TasksState;

    const destCol =
      destination.droppableId as keyof TasksState;

    const sourceItems = [
      ...tasks[sourceCol],
    ];

    const destItems = [
      ...tasks[destCol],
    ];

    const [removed] =
      sourceItems.splice(source.index, 1);

    if (sourceCol === destCol) {
      sourceItems.splice(
        destination.index,
        0,
        removed
      );

      dispatch({
        type: "SET_TASKS",
        payload: {
          ...tasks,
          [sourceCol]: sourceItems,
        },
      });
    } else {
      destItems.splice(
        destination.index,
        0,
        removed
      );

      dispatch({
        type: "SET_TASKS",
        payload: {
          ...tasks,
          [sourceCol]: sourceItems,
          [destCol]: destItems,
        },
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <h1 className="text-4xl font-bold text-center mb-8">
        Flow Kanban Board
      </h1>

      <TaskForm addTask={addTask} />

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {Object.entries(columnLabels).map(
            ([columnId, title]) => (
              <Column
                key={columnId}
                columnId={
                  columnId as keyof TasksState
                }
                title={title}
                tasks={
                  tasks[
                    columnId as keyof TasksState
                  ]
                }
                deleteTask={deleteTask}
                moveTask={() => {}}
              />
            )
          )}
        </div>
      </DragDropContext>
    </div>
  );
}

export default App;