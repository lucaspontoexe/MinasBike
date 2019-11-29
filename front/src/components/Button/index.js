import React from 'react'
import 'style.css'

export default function Button({children, color, textColor, onClick}) {
    return (

    <button style={{backgroundColor: color, color: textColor}} onClick={onClick}>{children}</button>
    )
}
