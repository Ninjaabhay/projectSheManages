import { SignIn } from "@clerk/clerk-react";
import React from "react";

function Login() {
  return (
    <section
      id="signup"
      className="min-h-screen flex items-start justify-center bg-gray-100 pt-12"
    >
      {/* Give the current path of page */}
      <SignIn
        path="/login"
        routing="path"
        signUpUrl="/signup"
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
      />
    </section>
  );
}

export default Login;
