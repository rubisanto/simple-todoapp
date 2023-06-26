"use client";

import { ITask } from "@/types/tasks";
import { FormEventHandler, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { deleteTodo, editTodo } from "@/api";

interface TaskProps {
  task: ITask;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const router = useRouter();
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string>(task.text);

  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    await editTodo({
      id: task.id,
      text: taskToEdit,
    });
    setOpenModalEdit(false);
    router.refresh();
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTodo(id);
    setOpenModalDeleted(false);
    router.refresh();
  };

  return (
    <tr key={task.id}>
      <td className="w-full">{task.text}</td>
      <td className="flex gap-4">
        <FiEdit
          onClick={() => {
            setOpenModalEdit(true);
          }}
          cursor="pointer"
          className="text-blue-500"
          size={25}
        />
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <form
            onSubmit={handleSubmitEditTodo}
            method="dialog"
            className="modal-box"
          >
            <h3>Edit Task</h3>
            <button
              onClick={() => setOpenModalEdit(false)}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
            <input
              value={taskToEdit}
              onChange={(e) => setTaskToEdit(e.target.value)}
              type="text"
              placeholder="Type here"
              className="input input-bordered input-primary w-full mb-5 mt-5"
            />
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </Modal>
        <FiTrash2
          onClick={() => setOpenModalDeleted(true)}
          cursor="pointer"
          className="text-red-500"
          size={25}
        />
        <Modal modalOpen={openModalDeleted} setModalOpen={setOpenModalDeleted}>
          <form method="dialog" className="modal-box">
            <h3 className="text-lg">
              Are you sure you want to delete this task ?
            </h3>
            <button
              onClick={() => setOpenModalDeleted(false)}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
            <div className="modal-action">
              <button
                onClick={() => handleDeleteTask(task.id)}
                className="btn btn-primary"
              >
                Yes
              </button>
            </div>
          </form>
        </Modal>
      </td>
    </tr>
  );
};

export default Task;
