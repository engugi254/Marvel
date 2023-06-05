import { Link, useMatch, useResolvedPath } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        Marvels
      </Link>
      <ul>
        <CustomLink to="/characters">Characters</CustomLink>
        <CustomLink to="/comics">Comics</CustomLink>
        <CustomLink to="/creators">Creators</CustomLink>
        <CustomLink to="/events">Events</CustomLink>
        <CustomLink to="/series">Series</CustomLink>
      </ul>
    </nav>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
