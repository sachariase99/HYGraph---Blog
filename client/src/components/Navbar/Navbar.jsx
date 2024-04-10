import { NavLink, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledNavLink = styled(NavLink)`
  color: #666;
  &:hover {
    color: black
  }
  &.active {
    color: black;
  }
`;

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSortChange = (e) => {
    if (e.target.value === "reset") {
      navigate("/blog");
    } else {
      navigate(`/blog?sort=${e.target.value}`);
    }
  };

  return (
    <div className="bg-[#333] py-4 relative top-0 left-0 right-0">
      <ul className="flex gap-4 uppercase font-bold text-2xl justify-center items-center bg-white w-[400px] h-[50px] m-auto rounded-full text-[#666]">
        <li>
          <StyledNavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>Home</StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/blog" className={({ isActive }) => (isActive ? "active" : "")}>Blog</StyledNavLink>
        </li>
      </ul>
      {location.pathname === "/blog" && (
        <select
          className="absolute top-1/2 right-4 -translate-y-1/2 p-2 rounded-full text-[#333] font-bold"
          onChange={handleSortChange}
        >
          <option value="reset">Choose</option>
          <option value="date">Sort by date</option>
          <option value="title">Sort by name</option>
        </select>
      )}
    </div>
  );
};

export default Navbar;
