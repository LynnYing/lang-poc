import { parser } from '../../public/grammar'
import { LRLanguage, LanguageSupport } from '@codemirror/language'
import { styleTags, tags as t } from '@lezer/highlight'

export const EXAMPLELanguage = LRLanguage.define({
  parser: parser.configure({
    props: [
      styleTags({
        String: t.string,
        Interpolation: t.keyword,
        // OpenInterpolation: t.tagName,
        // CloseInterpolation: t.tagName,
      }),
    ],
  }),
})

export function EXAMPLE() {
  return new LanguageSupport(EXAMPLELanguage)
}
