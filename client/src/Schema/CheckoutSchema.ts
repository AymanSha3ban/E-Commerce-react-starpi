import { z } from "zod";

export const CheckoutSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(3, { message: "First name must be at least 3 characters" }),
    lastName: z
      .string()
      .trim()
      .min(3, { message: "Last name must be at least 3 characters" }),
    email: z.string().trim().email({ message: "Invalid email address" }),
    phone: z
      .string()
      .trim()
      .regex(/^01[0125][0-9]{8}$/, {
        message: "Please enter a valid Egyptian phone number (e.g., 01012345678)",
      }),
    address: z
      .string()
      .trim()
      .min(5, { message: "Address must be at least 5 characters" }),
    city: z
      .string()
      .trim()
      .min(3, { message: "City must be at least 3 characters" }),
    postalCode: z.string().optional(),
    paymentMethod: z.enum(["CASH", "CARD"], {
      error: "Please select a payment method",
    }),
    cardNumber: z.string().optional(),
    expiryDate: z.string().optional(),
    cvc: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.paymentMethod === "CARD") {
      const cleanCardNumber = data.cardNumber?.replace(/\s+/g, "") || "";
      if (!/^\d{16}$/.test(cleanCardNumber)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Card number must be exactly 16 digits",
          path: ["cardNumber"],
        });
      }

      if (!data.expiryDate || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(data.expiryDate)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Expiry date must be in MM/YY format",
          path: ["expiryDate"],
        });
      }

      if (!data.cvc || !/^\d{3,4}$/.test(data.cvc)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "CVC must be 3 or 4 digits",
          path: ["cvc"],
        });
      }
    }
  });

export type CheckoutFormData = z.infer<typeof CheckoutSchema>;