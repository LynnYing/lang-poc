// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { useState } from 'react'
import './App.css'
import { templateOptions } from './constants'
import Editor from './editor'
import { ViewUpdate } from '@codemirror/view'

function App() {
  const [value, setValue] = useState('[IC50 Avg] & "+-" & [IC50 StdDev] & "(" & [IC50 Count] & ")"')
  const onClick = (value: string) => {
    // if (!viewRef.current) return
    // const view = viewRef.current
    // const cursor = view.state.selection.main.head
    // view.dispatch({
    //   changes: { from: cursor, insert: value },
    // })
  }

  const onChange = (value: string, vu: ViewUpdate) => {
    const cursor = vu.state.selection.main.head
    setValue(value)
    console.log("🚀 ~ cursor:", cursor)
  }

  return (
    <div>
      {templateOptions.map((option, index) => (
        <div key={index} onClick={() => onClick(option.value)}>{option.label}</div>
      ))}
      <Editor value={value} onChange={onChange} />
    </div>
  )
}

export default App
