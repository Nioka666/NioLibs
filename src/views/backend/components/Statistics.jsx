function Statistics() {
  const data = {
    labels: "labels",
    datasets: [
      {
        label: "Amount",
        data: "",
        backgroundColor: ["transparent", "transparent", "transparent"],
        borderColor: ["white", "#ba8b00dd", "gray"],
        borderWidth: 3,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  
  return (
    <>
      <div className="container d-flex">
        <div className="card">
          
        </div>
      </div>
    </>
  );
}

export default Statistics;
