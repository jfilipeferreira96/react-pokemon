import React from 'react'

export default function Pagination({page, totalPages, onLeftClick, onRightClick}) {
    
    return (
        <div className='pagination-container'>
            <button onClick={onLeftClick}><div>◀</div></button>
            <div>{page} of {totalPages}</div>
            <button onClick={onRightClick}><div>▶</div></button>
        </div>
    )
}
