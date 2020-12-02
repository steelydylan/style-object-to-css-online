const hyphenate = s =>
  s.replace(/[A-Z]|^ms/g, '-$&').toLowerCase()

const createRule = (className: string, key: string, value: string | number, children: string, media: string) => {
  const selector = '.' + className + children
  const rule = selector + '{' + hyphenate(key) + ':' + value + '}'
  if (!media) return rule
  return media + '{' + rule + '}'
}

const AT_REG = /^@/
const AMP = /&/g

const parse = (obj: Record<string, any>, children = '', media?: string) => {
  const rules = []
  const classNames = []
  Object.keys(obj).forEach(key => {
    const value = obj[key]
    if (value === null || value === undefined) return
    switch (typeof value) {
      case 'object':
        if (AT_REG.test(key)) {
          const { className, css } = parse(value, children, key)
          classNames.push(className)
          rules.push(css)
        } else {
          const child = key.replace(AMP, '')
          const { className, css } = parse(value, children + child, media)
          classNames.push(className)
          rules.push(css)
        }
        return
      case 'number':
      case 'string':
        const className = ''
        const rule = createRule(className, key, value, children, media)
        classNames.push(className)
        rules.push(rule)
    }
  })

  return {
    className: classNames.join(' '),
    rules,
    css: rules.join('')
  }
}

export default (obj = {}) => parse(obj)