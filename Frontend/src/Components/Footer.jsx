import React from "react";
import { Link } from "react-router-dom";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card.jsx";

function Footer() {
  return (
    <div>
      <footer className="text-center dark: lg:text-left">
        <div className="bg-black/5 p-2 text-center text-sm dark:text-gray-500">
          © 2024 Copyright{" "}
          <HoverCard>
            <HoverCardTrigger className="font-semibold text-[#43ca9f] hover:underline">
              IFFIONEX
            </HoverCardTrigger>
            <HoverCardContent>
              IFFIONEX is an open-source service created & maintained by @Arfan Abid
            </HoverCardContent>
          </HoverCard>{" "}
          all rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default Footer;
