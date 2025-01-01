import Image from "next/Image";
function Navbar() {
  return (
    <>
      <div>
        <Image
          src="/logo.jpg"
          width={500}
          height={500}
          alt="Picture of the author"
        />
      </div>
    </>
  );
}

export default Navbar;
