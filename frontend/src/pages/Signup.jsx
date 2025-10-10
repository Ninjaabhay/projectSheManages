import React from "react";
import { SignUp, useUser } from "@clerk/clerk-react";

function Signup() {
  return (
    <section
      id="signup"
      className="min-h-screen flex items-start justify-center bg-gray-100 pt-12"
    >
      {/* Give the current path of page */}
      <SignUp
        path="/signup"
        routing="path"
        signInUrl="/login"
        appearance={{
          elements: {
            firstNameField: { display: "none" },
            lastNameField: { display: "none" },
            formButtonPrimary:
              "bg-primary hover:bg-secondary text-white border-0",
            formInput: "border border-gray-300 rounded-md p-2",
            formFieldLabel: "text-heading font-semibold",
            socialButtonsBlock: "space-y-2",
          },
        }}
        fallbackRedirectUrl="/signup" // Go here on failure
        forceRedirectUrl="/profile-setup" // Go here on success
      />
    </section>
  );
}

export default Signup;
