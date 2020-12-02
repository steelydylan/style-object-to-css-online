import React, { useState, useRef } from "react";
import { render } from "react-dom"
import cssBeautify from "cssbeautify"
import objectStyle from './object-style'

const Converter = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [result, setResult] = useState("")
  const handleClick = () => {
    const { value } = textareaRef.current
    const { css } = objectStyle(eval(`(${value})`))
    setResult(cssBeautify(css))
  }
  return (<div className="flex">
    <div className="flex-item">
      <textarea className="source" ref={textareaRef} />
      <button className="btn" onClick={handleClick}>変換</button>
    </div>
    <div className="flex-item">
      <textarea className="target" readOnly value={result} />
    </div>
  </div>)
}

render(<Converter />, document.getElementById("app"))
