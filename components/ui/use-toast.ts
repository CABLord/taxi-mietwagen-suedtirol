
"use client"

import { useToast as useToastOriginal } from "@/components/ui/toast"

// If useToastOriginal is undefined, provide a dummy implementation
const dummyToast = () => ({
  toast: () => {},
  dismiss: () => {},
  // Add any other methods that the original useToast might have
});

export const useToast = useToastOriginal || dummyToast;
