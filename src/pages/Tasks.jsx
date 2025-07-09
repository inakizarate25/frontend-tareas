import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import "dayjs/locale/es";
dayjs.locale("es");

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login");
      } else {
        toast.error("Error al obtener tareas");
      }
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      await API.post("/tasks", newTask);
      setNewTask({ title: "", description: "" });
      fetchTasks();
      toast.success("Tarea creada ✅");
    } catch {
      toast.error("Error al crear tarea");
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
      toast.info("Tarea eliminada");
    } catch {
      toast.error("Error al eliminar tarea");
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await API.put(`/tasks/${id}`, { status: newStatus });
      fetchTasks();
    } catch {
      toast.error("Error al actualizar tarea");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const statusOptions = ["pendiente", "en progreso", "completada"];

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Mis Tareas</h2>
        <form onSubmit={handleAddTask} className="space-y-3 mb-6">
          <input
            type="text"
            placeholder="Título"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
          <textarea
            placeholder="Descripción"
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Agregar Tarea
          </button>
        </form>

        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-gray-50 border p-4 rounded shadow-sm"
            >
              <h4 className="font-semibold">{task.title}</h4>
              <p className="text-sm">{task.description}</p>
              <p className="text-sm text-gray-500">
                {dayjs(task.createdAt).format("D [de] MMMM [de] YYYY, HH:mm")}
              </p>

              <div className="flex items-center gap-2 mt-2">
                <select
                  value={task.status}
                  onChange={(e) => handleUpdateStatus(task._id, e.target.value)}
                  className="p-1 border rounded"
                >
                  {statusOptions.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => handleDeleteTask(task._id)}
                  className="text-red-600 hover:underline ml-auto"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
