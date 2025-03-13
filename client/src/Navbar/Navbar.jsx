import React, { useEffect, useState } from 'react'
import MobileNav from './MobileNav/MobileNav';
import ComputerNav from './ComputerNav/ComputerNav';

const Navbar = () => {

  const [isMobile, setIsMobile] = useState(window.innerWidth < 475);

  useEffect(() => {

    const handleResize = () => {
      setIsMobile(window.innerWidth < 475);

    };


    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  return isMobile ? <MobileNav /> : <ComputerNav />


}

export default Navbar