
"use client"

// Import the toast component if it exists
let ToastComponent;
try {
  ToastComponent = require("@/components/ui/toast");
} catch (error) {
  console.warn("Toast component not found. Using dummy implementation.");
}

// Dummy implementation of useToast
const dummyUseToast = () => ({
  toast: () => {},
  dismiss: () => {},
});

// Export the useToast function
export const useToast = ToastComponent?.useToast || dummyUseToast;
