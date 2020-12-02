import React, { useState, useRef } from "react";
import { render } from "react-dom"
import cssBeautify from "cssbeautify"
import csso from 'csso'
import objectStyle from './object-style'

const placeholder = `{
  drawer: {
    position: 'relative',
    height: '100%',
    width: 72,
    flex: 'initial',
    backgroundColor: '#fff',
    boxShadow: '0px 1px 3px 0 rgba(0, 0, 0, 0.15)',
    borderRight: 'none',
    zIndex: 11,
    '& .MuiListItemText-root': {
      display: 'none',
    },
  }
}`

const Converter = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [result, setResult] = useState("")
  const handleClick = () => {
    const { value } = textareaRef.current
    const { css } = objectStyle(eval(`(${value})`))
    setResult(cssBeautify(csso.minify(css).css))
  }
  return (<div className="flex">
    <div className="flex-item">
      CSS Object
      <textarea className="source" ref={textareaRef} placeholder={placeholder} />
      <button className="btn" onClick={handleClick}>変換</button>
    </div>
    <div className="flex-item">
      CSS
      <textarea className="target" readOnly value={result} />
    </div>
  </div>)
}

render(<Converter />, document.getElementById("app"))
