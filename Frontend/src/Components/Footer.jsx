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
      <footer class=" text-center dark: lg:text-left  ">
        <div class="bg-black/5 p-2 text-center text-sm  dark:text-gray-500">
          <Link to="/">
            © 2024 Copyright{" "}
            <span className="hover:underline text-[#43ca9f]  ">
              <HoverCard>
                <HoverCardTrigger className="font-semibold">IFFIONEX </HoverCardTrigger>
                <HoverCardContent>
                  IFFIONEX is an open-source service created & maintainedby @Arfan Abid
                </HoverCardContent>
              </HoverCard>
            </span>
            all rights reserved.
          </Link>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
