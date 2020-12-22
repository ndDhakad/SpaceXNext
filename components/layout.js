import styles from "../styles/Home.module.css";

export default function Layout (props) {
    return(
        <div>
            <h1>Space X Launch Programs</h1>
            {props.children}
            <footer className={styles.footer}>
                <a
                    href="https://github.com/ndDhakad/SpaceXNext"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Developed by: Namita Dhakad
                </a>
            </footer>
        </div>
        );
}
