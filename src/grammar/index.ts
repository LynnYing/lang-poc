import { parser } from '../../public/grammar'
import { LRLanguage, LanguageSupport } from '@codemirror/language'
import { styleTags, tags as t } from '@lezer/highlight'

export const EXAMPLELanguage = LRLanguage.define({
  parser: parser.configure({
    props: [
      styleTags({
        // String: t.string,
        // Interpolation: t.tagName,
        // Operator: t.operatorKeyword,
        Identifier: t.string,
        String: t.string,
        Interpolation: t.tagName,
        // OpenInterpolation: t.tagName,
        // CloseInterpolation: t.tagName,
        // Number: t.number,
      }),
    ],
  }),
})

export function EXAMPLE() {
  return new LanguageSupport(EXAMPLELanguage)
}
