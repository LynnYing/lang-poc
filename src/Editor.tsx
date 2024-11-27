import { Ref, forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { EditorView, ViewUpdate } from '@codemirror/view'
import { EditorState } from '@codemirror/state'
import { basicSetup, minimalSetup } from 'codemirror'
import { EXAMPLE } from './grammar'

type EditorProps = {
  value?: string
  onChange?: (value: string, vu: ViewUpdate) => void
}

export interface EditorRef {
  editor?: HTMLDivElement | null
  view?: EditorView | null
}

function Editor(props: EditorProps, ref: Ref<EditorRef>) {
  const { value, onChange } = props
  const editorRef = useRef<HTMLDivElement | null>(null)
  const [view, setView] = useState<EditorView | null>(null)

  const updateListener = EditorView.updateListener.of((vu: ViewUpdate) => {
    if (vu.docChanged) {
      onChange?.(vu.state.doc.toString(), vu)
    }
  })

  useEffect(() => {
    if (value === undefined) return
    const currentValue = view?.state.doc.toString() ?? ''
    if (view && value !== currentValue) {
      view.dispatch({
        changes: { from: 0, to: currentValue.length, insert: value || '' },
      })
    }
  }, [view, value])

  useEffect(() => {
    const currentView = new EditorView({
      doc: value,
      extensions: [minimalSetup, EXAMPLE(), updateListener],
      parent: editorRef.current!,
    })
    setView(currentView)
    return () => {
      currentView.destroy()
      setView(null)
    }
  }, [])

  useImperativeHandle(ref, () => ({ editor: editorRef.current, view: view }), [view])

  return <div ref={editorRef} style={{ width: 500, height: 100 }}></div>
}

export default forwardRef(Editor)
