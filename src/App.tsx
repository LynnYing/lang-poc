import { useEffect, useState } from 'react'
import { EditorView, basicSetup } from 'codemirror'
// import { javascript } from '@codemirror/lang-javascript'
import { autocompletion } from '@codemirror/autocomplete'
import { EXAMPLE } from './grammar'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

function myCompletions(context: any) {
  let word = context.matchBefore(/\w*/)
  if (word.from === word.to && !context.explicit) return null
  return {
    from: word.from,
    options: [
      { label: 'match', type: 'keyword' },
      { label: 'Sum', type: 'keyword', apply: 'Sum' },
      { label: 'hello', type: 'variable', info: '(World)' },
      { label: 'magic', type: 'text', apply: '⠁⭒*.✩.*⭒⠁', detail: 'macro' },
    ],
  }
}

function App() {
  useEffect(() => {
    let editor = new EditorView({
      extensions: [basicSetup, EXAMPLE(), autocompletion({ override: [myCompletions] })],
      parent: document.getElementById('editor')!,
    })
    return () => {
      editor.destroy()
    }
  }, [])

  return <div id='editor' style={{ width: 500, height: 100 }}></div>
}

export default App
