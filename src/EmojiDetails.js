import React from 'react'

export default function EmojiDetails({ data }) {
  return <aside className="emoji-details">
    <p>{data.keywords}</p>
    <h2><span>{data.char}</span> {data.name}</h2>
    <h4>{data.code}</h4>
  </aside>
}