const navbar = () => {
    return (
        <>
            <nav id="navbar">
                <div className="container nav-content">
                    <div>
                        <img src="https://cdn.prod.website-files.com/67691f03eb5bfa3289b3daed/67691f03eb5bfa3289b3e2ad_Shvasa%20Logo.png" alt="Shvasa-logo" />
                    </div>
                    <div>
                        <a href="/" className="nav-item">Home</a>
                        <a href="/" className="nav-item">Pricing</a>
                        <a href="/" className="nav-item">Why Us?</a>
                        <a href="/" className="nav-item">About</a>
                        <a href="/" className="nav-item">Contact Us</a>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default navbar
