## Lightspeed (React)
Lightspeed is a project with minimal Astraea components in order to test out various technologies and design patterns. This repository in particular focuses on React related technologies.

## Getting Started

```bash
pnpm run dev
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

NextJS and its integration with Vercel allows for enormous agility in developing complex web applications. The App router in Next13+ allows for more advanced SSR options, including features like Server Actions and Suspenses.


### Next Safe Action

This library integrates Server Actions with Zod Schema Library for better type safety. Having a monorepo using React Server Components and Server Actions allows for end-to-end type safety with minimal setup.

### Tanstack Query

Tanstack Query (AKA React Query), is an async state management library. You can use it for caching, making real time interfaces, infinite scroll interfaces, offline mode etc.

### Shadcn

A UI library that packages various open source, re-usable components and prestyles them with a unified design. This library integrates a lot of the best in class technologies for UI development such as Tailwind, RadixUI, Next Themes... etc., making Front End Development a breeze.

### Supabase

Supabase provides a managed Postgres Database. It also comes with additional features such as Auth, Realtime Tables, File storage and more. This combined with Vercel in their free tiers allows for scale to zero development for virtually any type of application.  

## Exploration

### Future Tech
Auth
- Clerk
- Lucia-Auth

Database
- Drizzle ORM

React
- Tanstack Router
- StyleX

Cloud
- Google Cloud

Frameworks
- Sveltedds
- Astro

Queues
- Inngest
- trigger.dev

Email
- Resend 

### Previous Tech
Database
- Planetscale
  - A good managed service for applications that expect to have to scale their database.
  - Uses Vitess - the same technology that powers services like Youtube and Github.
  - Supabase is used instead as it more suitable for MVP development and smaller projects.
  - Update: Planetscale no longer has a free tier.
- Prisma ORM
  - I ended up not using ORMs as I found that they often slowed down development by quite a lot. Not only do you still need to manage your database, but you also need to learn about the ORM layer, the apis, migrations etc.
- Kysely
  - Kysely combined with kysely-codegen is a great way to get typesafety from your sql queries.
  - Here, I opted to stick with Supabase as it also allows me to do the same thing. 
  - Also, since I'm using Supabase for Auth (and potentially other features in the future), I wanted better integration with the supabase client (using Kysely would have broken integration with RLS etc.).


## Core Guidelines

### Colocation

In this project, we experiment with the idea of extreme colocation. Colocation makes it easier to reason about the code, which improves maintainability in the long run. The following are some established guidelines:

- Prefer creating localised component files within the same folder over creating common services.
  - /path/to/some-component.tsx
  - /path/to/some-component.action.ts
  - /path/to/some-component.service.ts
  - /path/to/some-component.client.ts
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
Global components can be called from anywhere. They are demarked by a (global) import. (e.g. import { config } from "@/(global)/configs/...)

`/lib`
  - AWS SDK
  - Supabase
  - Next Safe Action
  - Error handling
  - Utilities

`/components/ui`
  - Shadcn/ui

`/providers` 
  - Next Themes
  - React Query

`/configs`

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

### React / NextJS 
- Avoid using nested React functions (see [link](https://helderberto.com/reactjs-tips-tricks-avoid-nested-render-functions)).
- The main TSX component should be named after the file name. 
  ```
  // server-status.tsx
  
  export function ServerStatus() { ... }
  ```
- Server Actions
  - Server Action functions should be indicated by \<name>Action (e.g. getStatusAction, createToDoAction)
  - Server Actions should be stored in a .action.ts file corresponding to the component that uses it (e.g. component1.tsx, component1.action.ts)
  - Create a separate service file for each server action (name it \<component>.service.ts). All of the logic (including schema) should be in the service file for maximum reusability.

- SSR
  - The base component should always be SSR. Any client behaviors should be implemented in a separate .client.tsx file and invoked by the base component. This will ensure that the developer is always thinking about both client and server side behaviors. 

### HTTP
- APIs should be indicated by \<name>API (e.g. getToDoAPI, createToDoAPI)