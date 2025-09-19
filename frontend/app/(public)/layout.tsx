import React from "react";

import Squares from "@/components/Squares";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative min-h-screen">
      {/* Background layer with squares */}
      <div className="fixed inset-0 z-0">
        <Squares direction="diagonal" speed={0.5} squareSize={40} />
      </div>

      {/* Content layer with selective pointer events */}
      <div className="relative z-10 pointer-events-none">
        {/* Only interactive elements get pointer events */}
        <div className="pointer-events-auto">
          <Navbar />
        </div>

        <main className="relative">
          {/* Text content stays non-interactive, buttons/links get pointer events */}
          <div className="pointer-events-none">
            {/* Add pointer-events-auto to specific interactive elements */}
            <div className="[&_button]:pointer-events-auto [&_a]:pointer-events-auto [&_input]:pointer-events-auto [&_select]:pointer-events-auto [&_textarea]:pointer-events-auto">
              {children}
            </div>
          </div>
        </main>

        <div className="pointer-events-auto">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default PublicLayout;
