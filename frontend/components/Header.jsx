import AddJob from "@/components/AddJob";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";

const Header = () => {
  return (
    <>
      <div>Mini job Dapp</div>
      <Link href="/">Home</Link>
      <Link href="/add-job">Add Job</Link>
      <ConnectButton />
    </>
  );
};

export default Header;
