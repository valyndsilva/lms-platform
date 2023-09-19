import { UserButton } from "@clerk/nextjs";

type Props = {};

export default function page({}: Props) {
  return (
    <div>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
