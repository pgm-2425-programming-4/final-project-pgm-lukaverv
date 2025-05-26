function NavBar() {
    return (
    <>
        <section className="main__project-options">
            <div>
                <select id="filter" className="main__filter-select">
                    <option value="all">All</option>
                    <option value="back-end">Back-End</option>
                    <option value="front-end">Front-End</option>
                    <option value="documentation">Documentation</option>
                    <option value="infra">Infra</option>
                </select>
                <input type="text" className="main__search-input" placeholder="Search by description" />
            </div>
            <div>
                <p className="main__active-project">Active Project: PGM3</p>
            </div>
        </section>
    </>
    )
}

export default NavBar