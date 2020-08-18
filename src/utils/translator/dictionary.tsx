import fi from './fi.json'
import en from './en.json'
import { Lang } from '../../reducers/uiReducer'

const langs: Record<Lang, Record<string, string>> = {
  'fi': fi as Record<string, string>,
  'en': en as Record<string, string>
}

export const text = (lang: Lang, key: string) => {
  if (key in langs[lang]) {
    return langs[lang][key]
  }
  return key
}

export default (lang: Lang) => {
  return langs[lang]
}
