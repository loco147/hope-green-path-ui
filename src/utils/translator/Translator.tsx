import { PureComponent } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import dictionary from './dictionary'
import { Lang } from '../../reducers/uiReducer'

interface PropsType {
  children: string
}

class Translate extends PureComponent<PropsType & PropsFromRedux> {

  translateWord(lang: Lang, key: string): string {
    try {
      const dict = dictionary(lang)
      if (key in dict) {
        return dict[key]
      } else {
        return key
      }
    } catch (err) {
      console.error('Error while translating::translateWord', err)
      return key
    }
  }

  render() {
    const { lang, children } = this.props
    if (typeof children === 'string') {
      return this.translateWord(lang, children.toLowerCase().trim())
    } else {
      console.error('Translator child should be string')
      return ''
    }
  }
}

const mapStateToProps = (state: ReduxState) => ({
  lang: state.ui.lang
})

const connector = connect(mapStateToProps, {})
type PropsFromRedux = ConnectedProps<typeof connector>
export default connector(Translate)
