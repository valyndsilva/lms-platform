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
