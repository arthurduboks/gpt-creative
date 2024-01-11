import Link from "next/link";

const links = [
  {
    href: "/chat",
    label: "chat",
  },
  {
    href: "/creatives",
    label: "creatives",
  },
  {
    href: "/creatives/new-creative",
    label: "new creative",
  },
  {
    href: "/profile",
    label: "profile",
  },
];

const Navlinks = () => {
  return (
    <ul className="menu text-base-content">
      {links.map((link) => {
        return (
          <li key={link.href}>
            <Link href={link.href} className="capitalize">
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Navlinks;
