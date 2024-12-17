import Accordion from "../Accordion";
import "./Sidebar.scss";

const Sidebar = () => {
  const sidebarItems = [
    {
      id: "brand",
      title: "Brand",
      expanded: true,
      options: [
        { id: "brand-apple", label: "Apple", checked: false },
        { id: "brand-samsung", label: "Samsung", checked: false },
        { id: "brand-xiaomi", label: "Xiaomi", checked: false },
        { id: "brand-oneplus", label: "OnePlus", checked: false },
      ],
    },
    {
      id: "colors",
      title: "Colors",
      options: [
        { id: "color-black", label: "Black", checked: false },
        { id: "color-white", label: "White", checked: false },
        { id: "color-blue", label: "Blue", checked: false },
        { id: "color-red", label: "Red", checked: false },
        { id: "color-green", label: "Green", checked: false },
      ],
    },
    {
      id: "battery-capacity",
      title: "Battery capacity",
      options: [
        { id: "battery-capacity-4000mah", label: "4000mAh", checked: false },
        { id: "battery-capacity-4500mah", label: "4500mAh", checked: false },
        { id: "battery-capacity-5000mah", label: "5000mAh", checked: false },
        { id: "battery-capacity-5500mah", label: "5500mAh", checked: false },
        { id: "battery-capacity-6000mah", label: "6000mAh", checked: false },
      ],
    },
    {
      id: "built-in-memory",
      title: "Built-in memory",
      options: [
        { id: "built-in-memory-32gb", label: "32GB", checked: false },
        { id: "built-in-memory-64gb", label: "64GB", checked: false },
        { id: "built-in-memory-128gb", label: "128GB", checked: false },
        { id: "built-in-memory-256gb", label: "256GB", checked: false },
      ],
    },
  ];

  return (
    <aside className="w-25 py-4 px-3">
      {sidebarItems.map((sideItem) => (
        <Accordion
          key={sideItem?.id}
          id={sideItem?.id}
          title={sideItem?.title}
          expanded={sideItem?.expanded}
        >
          <ul className="list-unstyle p-0 px-1 py-2 m-0">
            {sideItem?.options.map((option) => (
              <li className="list-group-item" key={option?.id}>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={option?.id}
                    checked={option?.checked}
                  />
                  <label className="form-check-label" htmlFor={option?.id}>
                    {option?.label}
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </Accordion>
      ))}
    </aside>
  );
};

export default Sidebar;
