import React from 'react'
import './spinner.css'

const Spinner =()=>{
    return(
        <div className='w-100 h-100 d-flex justify-content-center align-items-center'>
            <div class="spinner-border text-secondary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}
export default Spinner