import React from 'react'

export default function Pagination({page, totalPages, onLeftClick, onRightClick}) {
    
    return (
        <nav className="pagination is-centered" role="navigation" aria-label="pagination">
            <button className="pagination-previous" onClick={onLeftClick}>Previous</button>
            <button className="pagination-next is-disabled" onClick={onRightClick}>Next page</button>
            <ul className="pagination-list">
                <li><span className="pagination-link">{page} / {totalPages}</span></li>
            </ul>
        </nav>
    )
}
