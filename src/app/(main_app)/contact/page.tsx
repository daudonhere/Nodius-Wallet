import React from 'react';
import { HeroSection } from "./components/HeroSection"; 
import { ContactList } from "./components/ContactList";

export default function ContactPage() {

  return (
    <div className="flex flex-col gap-4 w-full h-full content-fade-in">
      <HeroSection />
      <ContactList />
    </div>
  );
}