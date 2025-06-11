import { useState } from "react";
import AddTaskModal from "../../Tasks/AddTaskModal";

function AddTaskBtn() {
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="main__button main__button--add-task"
      >
        Add Task
      </button>
      {showModal && <AddTaskModal onClose={handleClose} />}
    </>
  );
}

export default AddTaskBtn;
