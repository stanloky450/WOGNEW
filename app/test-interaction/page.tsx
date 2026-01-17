"use client"

import { useState } from "react"

console.log("MODULE EXECUTED: /test-interaction/page.tsx")

export default function TestPage() {
  const [count, setCount] = useState(0)

  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <h1>Global Interactivity Test</h1>
      <p>Path: /test-interaction</p>
      <p>Count: {count}</p>
      <button 
        onClick={() => {
            alert("Works!")
            setCount(c => c + 1)
        }}
        style={{ padding: "20px", background: "red", color: "white", fontSize: "20px" }}
      >
        CLICK ME
      </button>
    </div>
  )
}
