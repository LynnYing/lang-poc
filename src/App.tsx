// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { useRef, useState } from 'react'
import { ViewUpdate } from '@codemirror/view'
import { syntaxTree } from '@codemirror/language'
import './App.css'
import { Tokens, columnOptions, templateOptions } from './constants'
import Editor, { EditorRef } from './Editor'

function App() {
  const editorRef = useRef<EditorRef | null>(null)
  const [value, setValue] = useState('[IC50 Avg] & "+-" & [IC50 StdDev] & "(" & [IC50 Count] & ")"')
  const onClick = (value: string) => {
    if (!editorRef.current?.view) return
    const view = editorRef.current?.view
    const cursor = view.state.selection.main.head
    const from = view.state.selection.main.from
    const to = view.state.selection.main.to
    // console.log("🚀 ~ view:", view.state)
    const tree = syntaxTree(view.state)
    const node = tree.resolveInner(cursor, -1)
    console.log('🚀 ~ node:', node)
    view.focus();
    if (node.name === Tokens.Interpolation && cursor < node.to && cursor > node.from) {
      view.dispatch({
        changes: { from: node.from, to: node.to, insert: value },
        // selection: { anchor: node.from + value.length },
      })
    } else {
      view.dispatch({
        changes: { from, to, insert: value },
        // selection: { anchor: to },
      })
    }
  }

  const onChange = (value: string, vu: ViewUpdate) => {
    const cursor = vu.state.selection.main.head
    // setValue(value)
    console.log('🚀 ~ cursor:', cursor)
  }

  return (
    <div>
      <div>
        <h5>Template</h5>
        {templateOptions.map((option, index) => (
          <div key={index} onClick={() => onClick(option.value)}>
            {option.label}
          </div>
        ))}
      </div>
      <div>
        <h5>column</h5>
        {columnOptions.map((option, index) => (
          <div key={index} onClick={() => onClick(option.value)}>
            {option.label}
          </div>
        ))}
      </div>
      <Editor ref={editorRef} onChange={onChange} />
    </div>
  )
}

export default App
