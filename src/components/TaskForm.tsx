import { useState } from "react";

interface TaskFormProps {
  addTask: (
    title: string,
    description: string
  ) => void;
}

function TaskForm({
  addTask,
}: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");

  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (
      !title.trim() ||
      !description.trim()
    ) {
      return;
    }

    addTask(title, description);

    setTitle("");
    setDescription("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-md p-6 max-w-4xl mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-2 text-gray-700">
            Task Title
          </label>

          <input
            type="text"
            placeholder="Enter task title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-2 text-gray-700">
            Task Description
          </label>

          <input
            type="text"
            placeholder="Enter description"
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition duration-200 shadow-md"
        >
          Add Task
        </button>
      </div>
    </form>
  );
}

export default TaskForm;