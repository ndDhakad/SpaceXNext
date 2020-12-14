import styles from "../styles/Home.module.css";

export default function Layout (props) {
    return(
        <div>
            <h1>Space X Launch Details</h1>
            {props.children}
            <footer className={styles.footer}>
                <a
                    href=""
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Developed by Namita Dhakad
                </a>
            </footer>
        </div>
        );
}
