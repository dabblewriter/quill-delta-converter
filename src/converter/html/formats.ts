import { ConvertOptions, HtmlConvertResult } from '../../types'
type EmbedContent = Record<string, unknown>

export const FORMATS: Record<
  string,
  (options?: ConvertOptions) => HtmlConvertResult
> = {
  bold: () => ({ tagName: 'strong' }),
  italic: () => ({ tagName: 'em' }),
  underline: () => ({ tagName: 'u' }),
  strike: () => ({ tagName: 's' }),
  script: (options) => {
    if (options.attributes?.script === 'super') {
      return { tagName: 'sup' }
    } else if (options.attributes?.script === 'sub') {
      return { tagName: 'sub' }
    }
    return {}
  },
  link(options?: ConvertOptions) {
    return {
      tagName: 'a',
      attributes: {
        target: '_blank',
        rel: 'noopener noreferrer',
        href: options.attributes?.link as string,
      },
    }
  },
  image(options: ConvertOptions) {
    return {
      tagName: 'img',
      attributes: {
        src: (options.content as EmbedContent).image as string,
        alt: options.attributes?.alt as string,
        height: options.attributes?.height as string,
        width: options.attributes?.width as string,
      },
    }
  },
  video(options) {
    return {
      tagName: 'iframe',
      classNames: ['ql-video'],
      attributes: {
        src: (options.content as EmbedContent).video as string,
        frameborder: '0',
        allowfullscreen: 'true',
        height: options.attributes?.height as string,
        width: options.attributes?.width as string,
      },
    }
  },
  code() {
    return { tagName: 'code' }
  },
  'code-block': () => {
    return {
      tagName: 'pre',
      classNames: ['ql-code-block'],
      wrapper: {
        tagName: 'div',
        classNames: ['ql-code-block-container'],
      },
    }
  },
  blockquote() {
    return {
      tagName: 'blockquote',
    }
  },
  header(options) {
    return {
      tagName: `h${options.attributes?.header}`,
    }
  },
  list(options) {
    const { attributes } = options
    const wrapperTagname = 'ol' //attributes?.list === 'ordered' ? 'ol' : 'ul'

    return {
      innerHtml: `<span class="ql-ui" contenteditable="false"></span>${options.content}`,
      tagName: 'li',
      attributes: {
        'data-list': attributes?.list as string,
      },
      wrapper: {
        tagName: wrapperTagname,
      },
    }
  },
}
