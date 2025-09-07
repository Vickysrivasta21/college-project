"use client";
import Image from "next/image";
import './globals.css'
import Propertypage from "./(pagesRoute)/propertypage/page";
import Link from 'next/link'
import Landingpage from "./(pagesRoute)/Landingpage/page";
// import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <div>
        <Landingpage/>
    </div>
  );
}
