import { useCallback } from 'react'
import { CompletionContext } from '@codemirror/autocomplete'
import { syntaxTree } from '@codemirror/language'
import { Tokens } from './constants'

const useAutoComplete = () => {
  return useCallback(async (context: CompletionContext) => {
    const { state, pos } = context

    const tree = syntaxTree(state)
    const node = tree.resolveInner(pos, -1)
    console.log('🚀 ~ node:', node)
    const attributeList = [
      { label: 'match', type: 'keyword' },
      { label: 'Sum', type: 'keyword', apply: 'Sum' },
      { label: 'hello', type: 'variable', info: 'Returns the absolute value of the argument. Example: Abs(-2)' },
      { label: 'magic', type: 'text', apply: '⠁⭒*.✩.*⭒⠁', detail: 'macro' },
    ]

    if (node.prevSibling?.name === Tokens.OpenInterpolation) {
      const sourceOptionList = attributeList

      return {
        from: node.from,
        // to: node.nextSibling?.to ?? node.to,
        options: sourceOptionList,
      }
    }

    const planeWord = context.matchBefore(/\w*/) ?? { from: 0, to: 0 }

    if (planeWord.from === planeWord.to && !context.explicit) return null

    return {
      from: planeWord.from,
      options: [],
    }
  }, [])
}

export default useAutoComplete
