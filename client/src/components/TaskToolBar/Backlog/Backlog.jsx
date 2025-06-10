function Backlog() {
  const handleClick = () => {
    // Logic to handle adding a task
    console.log("Backlog button clicked");
  };
  return (
    <button
      onClick={handleClick}
      className="main__button main__button--view-backlog"
    >
      Backlog
    </button>
  );
}

export default Backlog;
