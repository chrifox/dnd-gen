import Document from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static async getInitialProps (ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
            <style global jsx>
              {`
                * {
                  user-select: none;
                }
                body {
                  margin: 0;
                  font-family: 'Muli', sans-serif;
                  font-weight: 300;
                }
              `}
            </style>
          </>
        )
      }
    } finally {
      sheet.seal()
    }
  }
}
