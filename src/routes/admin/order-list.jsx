const orderList = () => {
  const orders = [];
  return (
    <>
      <div className="d-flex align-items-center justify-content-between gap-2 mb-4">
        <h1 className="fs-3 fw-semibold mb-0">Order List</h1>
      </div>

      {orders.length > 0 ? (
        <ul className="m-0 p-0"></ul>
      ) : (
        <p className="fs-5 fw-semibold mb-0 text-center text-black-50">
          No orderds found
        </p>
      )}
    </>
  );
};

export default orderList;
