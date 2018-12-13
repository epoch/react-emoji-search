import React from 'react'
import { parseUnicodes } from './utils'

export default function EmojiDetails({ data }) {
  return <aside className="emoji-details">
    <p>{data.keywords}</p>
    <h2>{data.name}</h2>
    <h4><span>{data.char}</span>{parseUnicodes(data.codes)}</h4>
  </aside>
}