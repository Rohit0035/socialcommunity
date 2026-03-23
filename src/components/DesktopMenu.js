import { FaCog, FaFileInvoice } from "react-icons/fa";

const DesktopMenu = () => {
  return (
    <div className="fb-desktop-menu">
      <h6 className="fw-bold mb-3">Menu</h6>

      <div className="fb-menu-grid">
        {menuItems.map((item, i) => (
          <div className="fb-menu-card" key={i}>
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      <div className="fb-settings">
        <h6 className="mt-3">Settings & privacy</h6>

        <div className="fb-setting-item">
          <FaCog /> Settings
        </div>

        <div className="fb-setting-item">
          <FaFileInvoice /> Orders and payments
        </div>
      </div>
    </div>
  );
};

export default DesktopMenu;