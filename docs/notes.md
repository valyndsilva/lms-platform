# LMS Platform: Next.js 13, React, Stripe, Mux, Prisma, Tailwind, MySQL

## Basic Setup:

Go to https://ui.shadcn.com/docs/installation/next

```
npx create-next-app@13.4.12 lms-platform --typescript --tailwind --eslint

Need to install the following packages:
  create-next-app@13.4.12
Ok to proceed? (y) y
✔ Would you like to use `src/` directory? … No
✔ Would you like to use App Router? (recommended) … Yes
✔ Would you like to customize the default import alias? … No 
Creating a new Next.js app in /Users/vmd/Documents/Repos/lms-platform.

npx shadcn-ui@latest init

✔ Would you like to use TypeScript (recommended)? … yes
✔ Which style would you like to use? › Default
✔ Which color would you like to use as base color? › Slate
✔ Where is your global CSS file? … app/globals.css
✔ Would you like to use CSS variables for colors? …  yes
✔ Where is your tailwind.config.js located? … tailwind.config.js
✔ Configure the import alias for components: … @/components
✔ Configure the import alias for utils: … @/lib/utils
✔ Are you using React Server Components? … yes
✔ Write configuration to components.json. Proceed? … yes

npm run dev
```

## Test Tailwind Setup:

In app/page.tsx:
```
import Image from "next/image";

export default function Home() {
  return <p className="text-3xl font-medium text-sky-700">LMS Platform</p>;
}
```

The tailwind utility classes should work.

## Add Shadcn/ui components:

Select the components you need for ex: Go to https://ui.shadcn.com/docs/components/button:
 
 ```
 npx shadcn-ui@latest add button
 Ready to install components and dependencies. Proceed? … yes
 ```

 Now the component is added in compponents/ui/button.tsx

 ### Test the shadcn/ui component:
 
 In app/page.tsx:
 ```
 import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return <>
  <p className="text-3xl font-medium text-sky-700">LMS Platform</p>
  <Button variant="destructive">Click Me</Button>
  </>
}

 ```

 To overwrite a component you customised earlier to it's original version:
 ```
  npx shadcn-ui@latest add button --overwrite
 ```