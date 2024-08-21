function CategoriesRow() {
  const categoryData = [
    {
      label: "Physics",
      icon: "fa-solid fa-flask",
    },
    {
      label: "Historical",
      icon: "fa-solid fa-landmark",
    },
    {
      label: "Geographs",
      icon: "fa-solid fa-earth-americas",
    },
    {
      label: "Animals",
      icon: "fa-solid fa-paw",
    },
  ];

  return (
    <>
      <div className="niolibs-category">
        <h3 className="display-5 fw-bold lh-1 text-ijo">Categories</h3>
        <h5 className="mb-5 mt-4 text-gray w-50">
          Lorem ipsum dor sit, amet consectetur adipisicing elit. Voluptates! Lorem ipsum .
        </h5>
        <div className="category-card mb-5">
          {categoryData.map((category) => (
            <div key={category.label} className="cardd d-flex">
              <i className={category.icon}></i>
              <h5 className="fw-medium text-gray">{category.label}</h5>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default CategoriesRow;
