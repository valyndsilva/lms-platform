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

## Update package.json:

Change the next version manually to:

```
 From "next": "13.4.19", to  "next": "13.4.12",
 From "eslint-config-next": "13.4.19", to "eslint-config-next": "13.4.12",

  npm install
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

## Add some css to app/globals.css:

```
html,
body,
:root {
 height: 100%;
}
```

## Install a VSCode Extension Next.Nav

Press cmd + shift+ p > type next.nav > Import path: app > Submit

You can see a visaul representation of your page routes.

## Routes, Api Routes, Route Groups Examples:

### Create a test route:

In app/test/page.tsx: rafce or tsrafce or tsrfc or tsrfce

```
import React from 'react'

type Props = {}

const page = (props: Props) => {
  return (
    <div>test page</div>
  )
}

export default page
```

Go to http://localhost:3000/test and it should work.

If you now see the Next.Nav extension you can see the newly added test route.

### Create a test api route:

In app/api/test/route.ts

```
import { NextResponse } from "next/server";

export async function GET(){
    return NextResponse.json({test:"Hello"});
}
```

Go to http://localhost:3000/api/test and you should see the response:

```
{"test":"Hello"}
```

### Create a route group:

You can create route group for organising purposes using ( ) and it won't affect the routing.
Ex: app/(group1)/route1/page.tsx would be http://localhost:3000/route1
Ex: app/(group1)/route2/page.tsx would be http://localhost:3000/route2

#### Route group layout:

You can create layout.tsx in the route group and all the routes in that group will reflect the layout.
Ex: app/(group1)/layout.tsx:

```
import React from "react";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return <div className="h-full bg-sky-700 text-white">{children}</div>;
};

export default layout;

```

Group routes are excellent to use when creating pages with different layouts like sidebar etc.

## Create Route groups:

### Dashboard Routes:

Move page.tsx from app to app/(dashboard)/(routes)/page.tsx. The path is still http://localhost:3000

```
import React from "react";

type Props = {};

export default function page({}: Props) {
  return <div>This is a protected page</div>;
}
```

### Auth Routes:

Create app/(auth)/(routes)/sign-in/page.tsx:

```
import React from 'react'

type Props = {}

const page = (props: Props) => {
  return (
    <div>This is an unprotected page</div>
  )
}

export default page
```

## Setup Authentication using Clerk:

Go to https://clerk.com/ > Sign in with Github > Approve clerkinc

### Create Application:

Application Name: lms-platform
How will your users sign in? Email, Google
Create Application

Click on Next.js type project and copy the API Keys to add later in .env file.

Next click on "Continue in Docs" (https://clerk.com/docs/quickstarts/nextjs)

### Install @clerk/nextjs

```
npm install @clerk/nextjs
```

### Set environment keys:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
```

Go to .gitignore and add .env to it to avoid pushing it to github.

### Mount <ClerkProvider />:

Update app/layout.tsx:

```
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next.js 13 with Clerk",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
```

### Protect your application (Create middleware):

In the root directory create middleware.ts:

```
import { authMiddleware } from "@clerk/nextjs";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
export default authMiddleware({});

export const config = {
      matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};

```

### Build your own sign in and sign up pages:

Create app/(auth)/(routes)/sign-up/[[...sign-up]]/page.tsx:

```
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return <SignUp />;
}
```

Create app/(auth)/(routes)/sign-in/[[...sign-in]]/page.tsx:

```
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return <SignIn />;
}

```

### Update your environment variables

In .env:

```
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```

### Embed the <UserButton />

In app/(dashboard)/(routes)/page.tsx:

```
import { UserButton } from "@clerk/nextjs";

type Props = {};

export default function page({}: Props) {
  return (
    <div>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}

```

npm run dev

This page http://localhost:3000 is now protected with Clerk Authentication.

### Add Layout:

Create app/(auth)/layout.tsx:

```
import React from "react";

type Props = {
  children: React.ReactNode;
};

function layout({ children }: Props) {
  return (
    <div className="h-full flex items-center justify-center">{children}</div>
  );
}

export default layout;

```

### Test Protected and Uprotected Routes:

Pages /sign-in and /sign-out are unprotected and all the remaining page routes are protected.

Create app/test/page.tsx:

```
import React from "react";

type Props = {};

function page({}: Props) {
  return <div>Test page is unprotected</div>;
}

export default page;

```

To make a particular page route for example /test unprotected go to middleware.ts and add it to your public routes:

```
import { authMiddleware } from "@clerk/nextjs";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
export default authMiddleware({
  publicRoutes: ["/test"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

```

Now go to http://localhost:3000/test and it's an unprotected route.

Go to http://localhost:3000 and Sign in using Google and you should be logged in.

## Creating Dashboard Layouts:

### Create Sidebar Component:

Create a app/(dashboard)/\_components/Sidebar.tsx:

```
import React from "react";

type Props = {};

export default function Sidebar({}: Props) {
  return <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">Sidebar</div>;
}
```

In _components folder the "_" excludes the folder from the URL and the folder won't have attributes and properties that route groups have like adding a shared layout.
It's mainly for organising components related to a route group. All the shared reusable components will be in /components in the root directory.

### Create Dashboard Layout:

Create app/(dashboard)/layout.tsx:

```
import React from "react";
import Sidebar from "./_components/sidebar";

type Props = {
  children: React.ReactNode;
};

export default function layout({ children }: Props) {
  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </div>
     <main className="md:pl-56 pt-[80px] h-full"> {children}</main>
    </div>
  );
}
```

Sign in to the application and you should see the Sidebar on medium screens and above.

### Download a Logo Image:

Go to https://logoipsum.com/ and choose any logo image to use. Copy the SVG. Create public/logo.svg and paste the code in it.

### Create Logo Component:

Create app/(dashboard)/\_components/Logo.tsx:

```
import Image from "next/image";
import React from "react";

type Props = {};

export default function Logo({}: Props) {
  return <Image height={130} width={130} alt="logo" src="/logo.svg" />;
}

```

### Create SidebarRoutes Component:

Create app/(dashboard)/\_components/SidebarRoutes.tsx:

```
"use client";
import React from "react";

type Props = {};

export default function SidebarRoutes({}: Props) {
  return <div>Sidebar Routes</div>;
}
```

### Update Sidebar:

```
import React from "react";
import Logo from "./Logo";
import SidebarRoutes from "./SidebarRoutes";

type Props = {};

export default function Sidebar({}: Props) {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
      <div className="p-6">
        <Logo />
      </div>
      <div className="flex flex-col w-full">
        <SidebarRoutes />
      </div>
    </div>
  );
}

```

### Create SidebarItem Component:

Create app/(dashboard)/\_components/SidebarItem.tsx:

```
"use client";
import React from "react";

type Props = {};

export default function SidebarItem({}: Props) {
  return <div>Sidebar Item</div>;
}

```

### Update SidebarRoutes Component:

In app/(dashboard)/\_components/SidebarRoutes.tsx:

```
"use client";
import { Compass, Layout } from "lucide-react";
import React from "react";

type Props = {};

const guestRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/",
  },
  {
    icon: Compass,
    label: "Browse",
    href: "/search",
  },
];
export default function SidebarRoutes({}: Props) {
  const routes = guestRoutes;
  return <div className="flex flex-col w-full">{routes.map((route)=>(<SidebarItem key={route.href} icon={route.icon} label={route.label} href={route.href}/>))}</div>;
}
```

### Create Search Route:

In app/(dashboard)/(routes)/search/pages.tsx:

```
import React from "react";

type Props = {};

export default function page({}: Props) {
  return <div>Search page</div>;
}

```

### Update SidebarItem Component:

Update app/(dashboard)/\_components/SidebarItem.tsx:

```
"use client";
import { LucideIcon } from "lucide-react";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

type Props = {
  icon: LucideIcon;
  label: string;
  href: string;
};

export default function SidebarItem({ icon: Icon, label, href }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);

  const onClick = () => {
    router.push(href);
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center gap-x-2 text-slate-500 text-sm font-md pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
        isActive &&
          "text-sky-700 bg-sky-200/20 hover:bg-sky-200/20 hover:text-sky-700"
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon
          size={22}
          className={cn("text-slate-500", isActive && "text-sky-700")}
        />
        {label}
      </div>
      <div
        className={cn(
          "ml-auto opacity-0 border-2 border-sky-700 h-full transition-all",
          isActive && "opacity-100"
        )}
      />
    </button>
  );
}

```

#### Create Navbar Component:

Create app/(dashboard)/\_components/Navbar.tsx:

```
import React from "react";

type Props = {};

export default function Navbar({}: Props) {
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      Navbar
    </div>
  );
}
```

### Update Dashboard Layout:

Update app/(dashboard)/layout.tsx:

```
import React from "react";
import Sidebar from "./_components/Sidebar";
import Navbar from "./_components/Navbar";

type Props = {
  children: React.ReactNode;
};

export default function layout({ children }: Props) {
  return (
    <div className="h-full">
      <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
        <Navbar/>
      </div>
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </div>
      <main className="md:pl-56 pt-[80px] h-full"> {children}</main>
    </div>
  );
}

```

### Create MobileSidebar Component:

Create app/(dashboard)/\_components/MobileSidebar.tsx:

```
import React from "react";
import { Menu } from "lucide-react";

type Props = {};

export default function MobileSidebar({}: Props) {
  return <Menu/>;
}
```

### Update Navbar.tsx:

In app/(dashboard)/\_components/Navbar.tsx:

```
import React from "react";
import MobileSidebar from "./MobileSidebar";

type Props = {};

export default function Navbar({}: Props) {
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <MobileSidebar />
    </div>
  );
}

```

### Install Sheet Component from Shadcn-ui:

```
npx shadcn-ui@latest add sheet
```

### Update MobileSidebar Component:

Update app/(dashboard)/\_components/MobileSidebar.tsx with Sheet Component:

```
import React from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "./Sidebar";
type Props = {};

export default function MobileSidebar({}: Props) {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-white">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
}

```

### Create a reusable NavbarRoutes Component:

In app/components/NavbarRoutes.tsx:

```
"use client";
import { UserButton } from "@clerk/nextjs";
import React from "react";

type Props = {};

export default function NavbarRoutes({}: Props) {
  return (
    <div className="flex gap-x-2 ml-auto">
      <UserButton />
    </div>
  );
}

```

### Update Navbar Component:

Update app/(dashboard)/\_components/Navbar.tsx

```
import React from "react";
import MobileSidebar from "./MobileSidebar";
import NavbarRoutes from "@/components/NavbarRoutes";

type Props = {};

export default function Navbar({}: Props) {
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <MobileSidebar />
      <NavbarRoutes/>
    </div>
  );
}
```

## Dynamic Layouts:

Update app/components/NavbarRoutes.tsx:

```
"use client";
import React from "react";
import { UserButton } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

type Props = {};

export default function NavbarRoutes({}: Props) {
  const pathname = usePathname();
  const isTeacherPage = pathname?.startsWith("/teacher");
  const isPlayerPage = pathname?.includes("/chapter");
  return (
    <div className="flex gap-x-2 ml-auto">
      {isTeacherPage || isPlayerPage ? (
        <Link href="/">
          <Button size="sm" variant="ghost">
            <LogOut className="h-4 w-4 mr-2" />
            Exit
          </Button>
        </Link>
      ) : (
        <Link href="/teacher/courses">
          <Button size="sm" variant="ghost">
            Teacher mode
          </Button>
        </Link>
      )}
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}

```

### Add Teacher Sidebar Routes:

Update app/(dashboard)/\_components/SidebarRoutes.tsx:

```
"use client";
import { BarChart, Compass, Layout, List } from "lucide-react";
import React from "react";
import SidebarItem from "./SidebarItem";
import { usePathname } from "next/navigation";

type Props = {};

const guestRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/",
  },
  {
    icon: Compass,
    label: "Browse",
    href: "/search",
  },
];

const teacherRoutes = [
  {
    icon: List,
    label: "Courses",
    href: "/teacher/courses",
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/teacher/analytics",
  },
];
export default function SidebarRoutes({}: Props) {
  // const routes = guestRoutes;

  const pathname = usePathname();
  const isTeacherPage = pathname?.includes("/teacher");
const routes = isTeacherPage? teacherRoutes : guestRoutes;
  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
}

```

### Create Teacher Routes:

#### Create app/(routes)/teahcer/course/page.tsx:

```
import React from 'react'

type Props = {}

export default function page({}: Props) {
  return (
    <div>Courses page</div>
  )
}
```

#### Create app/(routes)/teahcer/analytics/page.tsx:

```
import React from 'react'

type Props = {}

export default function page({}: Props) {
  return (
    <div>Analytics page</div>
  )
}
```

#### Create app/(routes)/teahcer/create/page.tsx:

```
import React from 'react'

type Props = {}

export default function page({}: Props) {
  return (
    <div>Create page</div>
  )
}
```

### Install packages:

```
npx shadcn-ui@latest add form
npx shadcn-ui@latest add input
npm install axios
npm install react-hot-toast
```

#### Update app/(routes)/teacher/courses/page.tsx:

```
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

type Props = {};

export default function page({}: Props) {
  return (
    <div className="p-6">
      <Link href="/teacher/create">
        <Button>New Course</Button>
      </Link>
    </div>
  );
}

```

#### Update app/(routes)/teahcer/create/page.tsx:

```
"use client";
import React from "react";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
});

type Props = {};

export default function page({}: Props) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // console.log(values);
    try {
      const response = await axios.post("/api/courses", values);
      router.push(`/teacher/courses/${response.data.id}`);
    } catch (e) {
      console.log("Something went wrong");
    }
  };
  return (
    <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
      <div>
        <h1 className="text-2xl">Name your course</h1>
        <p className="text-sm text-slate-600">
          What would you like to name your course? Don&apos;t worry, you can
          change this later.
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-8"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Title</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'Advanced web development"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    What will you teach in this course?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Link href="/">
                <Button variant="ghost" type="button">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" disabled={!isValid || isSubmitting}>
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

```

### Create components/providers/toasterProvider.tsx:
```
"use client";
import React from "react";
import { Toaster } from "react-hot-toast";

export default function toasterProvider() {
  return <Toaster />;
}
```

### Update app/layout.tsx:
```
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import ToasterProvider from "@/components/providers/toasterProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next.js 13 with Clerk",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ToasterProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

```

### Update app/(routes)/teahcer/create/page.tsx with toaster notification:

```
"use client";
import React from "react";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import toast from "react-hot-toast";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
});

type Props = {};

export default function page({}: Props) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // console.log(values);
    try {
      const response = await axios.post("/api/courses", values);
      router.push(`/teacher/courses/${response.data.id}`);
    } catch (e) {
      // console.log("Something went wrong");
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
      <div>
        <h1 className="text-2xl">Name your course</h1>
        <p className="text-sm text-slate-600">
          What would you like to name your course? Don&apos;t worry, you can
          change this later.
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-8"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Title</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'Advanced web development"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    What will you teach in this course?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Link href="/">
                <Button variant="ghost" type="button">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" disabled={!isValid || isSubmitting}>
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
```

## Setup Prisma and DB:
### Setup Prisma:
Install the Prisma extension in VSCode for syntax highlighting.

```
npm install --save-dev prisma
npx prisma init
```

This create a prisma/schema.prisma:
```
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

```

And in .env a variable DATABASE_URL

### Setup the DB:
We use MySQL and PlanetScale (https://planetscale.com/).
Signup with GitHub > Create a new database > Database Name: lms-platform > Region: eu-west-2 |(London) > 
Plan Type: Hobby (Free) > Add Card > Create database > Select your language or framework: Prisma > Create password

Next, copy the DATABASE_URL and paste it in the .env file.

### Create Schema:
Copy the schema.prisma from planetscale and paste it in th prisma/schema.prisma:
```
datasource db {
  provider     = "mysql"
  url          = env("DATABASE_URL")
  relationMode = "prisma"
}

generator client {
  provider = "prisma-client-js"
}
```

### Install Prisma Client:
```
npm install @prisma/client
```

### Create lib/db.ts:
```
import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}
// export const db = new PrismaClient(); // Causes issues in developement everytime we save a file a new prisma client instance is created which overloads thr project and crashes in development.
// globalThis is not affected by hot reloading so assigning db to globalThis will avoid crashing the project in development

export const db = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalThis.prisma = db;

```

### Create the Models:
Update prisma/schema.prisma:
```
datasource db {
  provider     = "mysql"
  url          = env("DATABASE_URL")
  relationMode = "prisma"
}

generator client {
  provider = "prisma-client-js"
}

model Course {
  id String @id @default(uuid())
  userId String
  title String @db.Text
  description String? @db.Text
  imageUrl String? @db.Text
  price Float?
  isPublished Boolean @default(false)

  categoryId String?
  category Category? @relation(fields: [categoryId], references: [id])

  attachments Attachment[]

  createdAt DateTime @default(now())
  updateedAt DateTime @updatedAt
    @@index([categoryId])
}

model Category{
  id String @id @default(uuid())
  name String @unique
  courses Course[]
}

model Attachment {
  id String @id @default(uuid())
  name String 
  url String @db.Text

  courseId String
  course Course @relation(fields:[courseId], references: [id], onDelete: Cascade)
  
  createdAt DateTime @default(now())
  updateedAt DateTime @updatedAt
  
  @@index([courseId])
}
```

Whenever you edit the schema.prisma you need restart the server:
```
npx prisma generate //add locally
npx prisma db push // push to planet scale or whatever database_url you included in .env.
```

## Create Course Creation API Route.
### Create app/api/courses/route.ts:
```
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const { title } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const course = await db.course.create({
      data: {
        userId,
        title,
      },
    });
    return NextResponse.json(course);
  } catch (error) {
    console.log("[COURSES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

```

### Update app/(dashboard)/(routes)/teacher/create/page.tsx:
```
"use client";
import React from "react";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import toast from "react-hot-toast";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
});

type Props = {};

export default function page({}: Props) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // console.log(values);
    try {
      const response = await axios.post("/api/courses", values);
      router.push(`/teacher/courses/${response.data.id}`);
      toast.success("Course created");
    } catch (e) {
      // console.log("Something went wrong");
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
      <div>
        <h1 className="text-2xl">Name your course</h1>
        <p className="text-sm text-slate-600">
          What would you like to name your course? Don&apos;t worry, you can
          change this later.
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-8"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Title</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'Advanced web development"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    What will you teach in this course?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Link href="/">
                <Button variant="ghost" type="button">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" disabled={!isValid || isSubmitting}>
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
```

```
 npm run dev
```

Try to create a course amd you get redirected to a not found page.

To see the DB entities:
```
npx prisma studio
```
 Prisma Studio is up on http://localhost:5555

 ### Create Course Id Page:
 Create app/(dashboard)/(routes)/teacher/courses/[courseId]/page.tsx:
 ```
import React from "react";

type Props = {
  params: {
    courseId: string;
  };
};

export default function page({ params }: Props) {
  const courseId = params.courseId;
  return <div>Course Id: {courseId}</div>;
}

 ```

## Course Edit Page UI:
