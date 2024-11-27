import { useEffect, useImperativeHandle, useRef, useState } from 'react'
import { EditorView, ViewUpdate } from '@codemirror/view'
import { EditorState } from '@codemirror/state'
import { basicSetup } from 'codemirror'
import { EXAMPLE } from './grammar'

type EditorProps = {
  value?: string
  onChange?: (value: string, vu: ViewUpdate) => void
}

function Editor(props: EditorProps) {
  const { value, onChange } = props
  const containerRef = useRef<HTMLDivElement | null>(null)
  const viewRef = useRef<EditorView | null>(null)
  // const [view, setView] = useState<EditorView | null>(null)
  const stateRef = useRef<EditorState>()

  const updateListener = EditorView.updateListener.of((vu: ViewUpdate) => {
    if (vu.docChanged) {
      onChange?.(vu.state.doc.toString(), vu)
    }
  })

  useEffect(() => {
    if (value === undefined) return
    const currentValue = viewRef.current?.state.doc.toString() ?? ''
    if (viewRef.current && value !== currentValue) {
      viewRef.current.dispatch({
        changes: { from: 0, to: currentValue.length, insert: value || '' },
      })
    }
  }, [value])

  useEffect(() => {
    viewRef.current = new EditorView({
      doc: value,
      extensions: [basicSetup, EXAMPLE(), updateListener],
      parent: containerRef.current!,
    })
    return () => {
      viewRef.current?.destroy()
      viewRef.current = null
    }
  }, [value])

  return <div ref={containerRef} style={{ width: 500, height: 100 }}></div>
}

export default Editor
