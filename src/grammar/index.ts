import {parser} from "../../public/grammar";
import {LRLanguage, LanguageSupport, indentNodeProp, foldNodeProp, foldInside, delimitedIndent} from "@codemirror/language"
import {styleTags, tags as t} from "@lezer/highlight"

export const EXAMPLELanguage = LRLanguage.define({
  parser: parser.configure({
    props: [
      // indentNodeProp.add({
      //   Application: delimitedIndent({closing: ")", align: false})
      // }),
      // foldNodeProp.add({
      //   Application: foldInside
      // }),
      styleTags({
        // Identifier: t.variableName,
        // Boolean: t.bool,
        // String: t.string,
        // LineComment: t.lineComment,
        Identifier: t.string,
        String: t.keyword,
        OpenInterpolation: t.operatorKeyword,
        CloseInterpolation: t.operatorKeyword,
        Colon: t.operatorKeyword,
        Source: t.operatorKeyword,
        Operator: t.operatorKeyword,
        Number: t.number,
      })
    ]
  }),
  // languageData: {
  //   commentTokens: {line: ";"}
  // }
})

export function EXAMPLE() {
  return new LanguageSupport(EXAMPLELanguage)
}
