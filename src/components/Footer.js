function Footer() {

    const currentYear = new Date().getFullYear();

    return (
        <footer>
            <div>&copy;{`${currentYear}`} Kevin Rogers</div>
        </footer>
    )
}

export default Footer