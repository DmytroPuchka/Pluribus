import { z } from "zod"

export const profileFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name must not exceed 100 characters"),
  email: z.string().email("Invalid email address"),
  country: z.string().min(1, "Please select a country"),
  city: z.string().min(1, "Please enter a city"),
  bio: z.string().max(500, "Bio must not exceed 500 characters").optional().or(z.literal("")),
  role: z.enum(["BUYER", "SELLER", "ADMIN"], {
    message: "Please select a valid role"
  }),
  deliveryCountries: z.array(z.string()).optional(),
}).refine((data) => {
  // Delivery countries required for sellers
  if (data.role === 'SELLER') {
    return data.deliveryCountries && data.deliveryCountries.length > 0;
  }
  return true;
}, {
  message: 'Please select at least one delivery country',
  path: ['deliveryCountries'],
})

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export type ProfileFormData = z.infer<typeof profileFormSchema>
export type ChangePasswordData = z.infer<typeof changePasswordSchema>
