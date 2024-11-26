import { useEffect, useState } from 'react'
import { EditorView, basicSetup } from 'codemirror'
// import { javascript } from '@codemirror/lang-javascript'
import { syntaxTree } from '@codemirror/language'
import { CompletionContext, autocompletion } from '@codemirror/autocomplete'
import { EXAMPLE } from './grammar'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import useAutoComplete from './useAutoComplete'

// function myCompletions(context: CompletionContext) {
//   const { state, pos } = context
//   const word = context.matchBefore(/\w*/) ?? {
//     from: 0,
//     to: 0,
//   }

//   const tree = syntaxTree(state)
//   const nodeBefore = tree.resolveInner(pos, -1)
//   console.log("🚀 ~ nodeBefore:", nodeBefore)
//   // let word = context.matchBefore(/\w*/)
//   if (word.from === word.to && !context.explicit) return null
//   return {
//     from: word.from,
//     options: [
//       { label: 'match', type: 'keyword' },
//       { label: 'Sum', type: 'keyword', apply: 'Sum' },
//       { label: 'hello', type: 'variable', info: '(World)' },
//       { label: 'magic', type: 'text', apply: '⠁⭒*.✩.*⭒⠁', detail: 'macro' },
//     ],
//   }
// }

function App() {
  const myCompletions = useAutoComplete();

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
