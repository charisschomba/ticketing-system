import Link from 'next/link'

export const Header = ({ currentUser }) => {

  const links = [
    !currentUser && { label: "Sign Up", href: "/auth/signup" },
    !currentUser && { label: "Sign In", href: "/auth/signin" },
    currentUser && { label: "Sign Out", href: "/auth/signout" },
  ]
  .filter(linkConfig => linkConfig)
  .map(({label, href}) => {
    return (
        <li className="nav-item" key={href}>
            <Link href={href}>{label}</Link>
        </li>
    )
  });

  return (
    <nav className="navbar navbar-light bg-light">
      <Link href="/">GitTix</Link>
      <div className="d-flex justify-content-end">
        <ul className="nav d-flex justify-content-center">
          {links}
        </ul>
      </div>
    </nav>
  );
};
