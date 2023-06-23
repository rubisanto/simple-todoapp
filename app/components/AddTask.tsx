"use client";

import { AiOutlinePlus } from "react-icons/ai";
import Modal from "./Modal";
import { useState } from "react";

export const AddTask = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  return (
    <div>
      <button
        // permet d'ouvrir le modal
        onClick={() => setModalOpen(true)}
        className="btn btn-primary w-full"
      >
        Add new task <AiOutlinePlus className="ml-2" size={24} />
      </button>

      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <h3>Add a new task</h3>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered input-primary w-full mb-5 mt-5"
        />
        <button type="submit" className="btn">
          Submit
        </button>
      </Modal>
    </div>
  );
};

export default AddTask;
