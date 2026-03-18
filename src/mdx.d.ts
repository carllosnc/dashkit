declare module '*.mdx' {
  import type { ComponentType, ElementType } from 'react'
  const Component: ComponentType<{ components?: Record<string, ElementType> }>
  export default Component
}
