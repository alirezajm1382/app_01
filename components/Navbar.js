import styles from "../styles/Navbar.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

function Navbar() {
  const router = useRouter();
  let pathname = router.pathname;
  return (
    <div className={styles.navbar}>
      <div className="d-flex flex-column align-items-start m-4">
        <Link legacyBehavior href="/" passHref>
          <a href="" className="list-group-item">
            <h1 className="fw-bold ">App</h1>
          </a>
        </Link>
        <p>Powered with love</p>
      </div>
      <ul className="d-grid gap-3">
        <Link legacyBehavior href="/table" passHref>
          <a
            href=""
            className={`list-group-item ${
              pathname == "/table" && "fs-4 fw-bold"
            }`}
          >
            Table
          </a>
        </Link>
        <Link legacyBehavior href="/gallery" passHref>
          <a
            href=""
            className={`list-group-item ${
              pathname == "/gallery" && "fs-4 fw-bold"
            }`}
          >
            Gallery
          </a>
        </Link>
        <Link legacyBehavior href="/todo" passHref>
          <a
            href=""
            className={`list-group-item ${
              pathname == "/todo" && "fs-4 fw-bold"
            }`}
          >
            To-do
          </a>
        </Link>
      </ul>
    </div>
  );
}

export default Navbar;
