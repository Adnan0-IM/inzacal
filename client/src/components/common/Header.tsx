import { Link } from "react-router";
import { ModeToggle } from "../mode-toggle";
import { SignedOut, UserButton } from "@daveyplate/better-auth-ui";

const Header = () => {
  return (
    <header className="border-b sticky top-0 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 z-50">
      <div className="container mx-auto p-4 flex items-center">
        <div className="flex items-center justify-between w-full">
          <Link to="/" className="font-bold text-xl">
            Inzacal
          </Link>
          <nav className="flex items-center gap-4">
           
            <ModeToggle />
            
              <div className="flex gap-3 items-center">
                <SignedOut>
                    <a href="/auth/sign-in" className="text-sm font-medium">
                        Sign In
                    </a>
                </SignedOut>
                <SignedOut>
                    <a href="/auth/sign-up" className="text-sm font-medium">
                        Create account
                    </a>
                </SignedOut>
                <UserButton size={"icon"} />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
