import Image from "next/image";

function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-100 shadow-md">
      <div>
        <Image
          src="/logo.jpg"
          className="rounded"
          width={100}
          height={100}
          alt="Logo"
          priority
        />
      </div>
    </nav>
  );
}

export default Navbar;
