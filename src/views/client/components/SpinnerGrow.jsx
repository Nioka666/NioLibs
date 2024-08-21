function SpinnerGrow() {
  return (
    <>
      <div className="container text-center">
        <div className="spinner-grow text-secondary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
}

export default SpinnerGrow;
