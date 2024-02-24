## Lightspeed (React)
Lightspeed is a project with minimal Astraea components in order to test out various technologies and design patterns. This repository in particular focuses on React related technologies.

## Getting Started

```bash
pnpm dev
```

## Core Stack

The following technologies have been integrated into the core stack:
- React
  - NextJS 14+
  - Next Safe Actions
  - Tanstack Query
- UI
  - Shadcn/ui
  - RadixUI
  - Tailwind
  - Next Themes
- Database
  - Supabase
- Services
  - AWS SDK V3
- Utilities
  - Zod
  - Typescript

### NextJS + React

NextJS and its integration with Vercel allows for enormous agility in developing complex web applications.

In particular, the DX for a monorepo using React Server Components and Server Actions allows for end-to-end type safety without resorting to libraries like tRPC (though still making use of libraries like Next Safe Action)

### 

## Core Guidelines

### Colocation

In this project, we experiment with the idea of extreme colocation. Colocation makes it easier to reason about the code, which improves maintainability in the long run. The following are some established guidelines:

- Hooks and Server Actions should be in a separate .ts file in the same folder as the component that is using it. 
  - /path/to/some-component.tsx
  - /path/to/some-component.action.ts
  - /path/to/some-component.hook.ts
- Components should follow [Top Down Composability](#top-down-composability) rules.


### Top Down Composability

Components can only make use of their own posterity. 
  - Allowed: `import * from ./my/own/children/`
  - Not Allowed: `import * from ../someone/elses/children`
  

Exceptions can be made for [Variant](#variants) and [Global](#global-components) components.

*Why Top Down Composability?*

To maximise colocation. The Parent > Child relationship is guaranteed from the perspective of the parent. That is to say that the parent component will be making use of the child component. However, the reverse is not true. A child component should be dependent on it's props and not an ancestor's component. By enforcing one way directional flow, we avoid placing components  very far from where they are actually being used.

A common Bottom Up approach is to put common components in the parent and have the children inherit these components. 

```
/common
    common-component
/child1/component1 -> uses common-component
/child2/component2 -> uses common-component
```

However, this results in the shared component being equally far from both of the child components. A better solution to is to make use of variants.


### Variants
Variants (and their descendents) can make use of the main sibling and their descendents as if they were their own.
  - Allowed: `import * from ../main-sibling/components`
  - Allowed: `import * from ../../main-sibling/components` (descendent making use of a parent's sibling component)

Components must be some sort of variant to be considered a sibling. Abstractions are not considered siblings.
  - Allowed: ` main: button, variants: red-button, blue-button`
  - Not Allowed: `main: user, variants: profile-page, user-nav`

Variants cannot be the main sibling of another variant. All variants should share the same main sibling.
  - Not Allowed: `main: button, variants: red-button, blue-red-button`
    
*How do variants help?*

```
/main-sibling
    /some/common-component
/variant
    /some/customisation 
```

When we look at variants, we see that while we still lose some distance by placing common components very far from the variant components, what we get is a clearer representation of the code. Customisations will live close to their variant components and it becomes very clear which components are reused and which are customisations for the variant.

### Global Components

`/lib`
  - AWS SDK
  - Supabase
  - Next Safe Action

`/components/ui`
  - Shadcn/ui

`/providers` 
  - Next Themes
  - React Query


## Conventions

### General
- URLs should be in Kebab case.
  - Kebab case makes URLs more readable.
  - Kebab case is better for SEO.
- File/Folder names should also be in Kebab case.
  - This is due to NextJS App router using the folder structure as URL paths.
- Variable and function names should be in camel case.
  - This includes [slugs] and is the only exception for not using Kebab case in folders.
- Database columns should be in Snake case.
- Keep the happy flow simple and easy to understand by avoiding else statements.
  - Prefer using early returns over nested else statements.
  - Prefer using functions to encapsulate exception scenarios.
  ```
  // avoid
  if (isPending) {
    // run pending code
  } else if (isError) {
    // run error code
  }

  //prefer
  if (isPending) return ...
  if (isError) return ...
  ```

### React
- Name your rendering subfunctions as render\<thing-to-render> (e.g. renderStatus, renderPosts).
  - This does not include the main TSX component which should be named after the file name. 
  ```
  // server-status.tsx
  
  export function ServerStatus() { ... }
  ```
- Server Actions should be indicated by \<name>Action (e.g. getStatusAction, createToDoAction)

### HTTP
- APIs should be indicated by \<name>API (e.g. getToDoAPI, createToDoAPI)