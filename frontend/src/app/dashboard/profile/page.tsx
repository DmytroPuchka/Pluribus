"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Upload, Check, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { profileFormSchema, changePasswordSchema, type ProfileFormData, type ChangePasswordData } from "./schema"

const COUNTRIES = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "uk", label: "United Kingdom" },
  { value: "au", label: "Australia" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
  { value: "jp", label: "Japan" },
  { value: "cn", label: "China" },
  { value: "in", label: "India" },
  { value: "br", label: "Brazil" },
]

const CITIES_BY_COUNTRY: Record<string, string[]> = {
  us: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"],
  ca: ["Toronto", "Vancouver", "Montreal", "Calgary", "Ottawa"],
  uk: ["London", "Manchester", "Birmingham", "Leeds", "Glasgow"],
  au: ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide"],
  de: ["Berlin", "Munich", "Frankfurt", "Hamburg", "Cologne"],
  fr: ["Paris", "Marseille", "Lyon", "Toulouse", "Nice"],
  jp: ["Tokyo", "Osaka", "Kyoto", "Yokohama", "Kobe"],
  cn: ["Beijing", "Shanghai", "Guangzhou", "Shenzhen", "Chengdu"],
  in: ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai"],
  br: ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador", "Fortaleza"],
}

interface MockUserData {
  id: string
  name: string
  email: string
  country: string
  city: string
  bio: string
  role: "buyer" | "seller" | "both"
  profilePhoto: string | null
  emailVerified: boolean
  phoneVerified: boolean
  idVerified: boolean
}

const MOCK_USER: MockUserData = {
  id: "user-123",
  name: "John Doe",
  email: "john.doe@example.com",
  country: "us",
  city: "New York",
  bio: "Passionate about international shopping and quality products.",
  role: "both",
  profilePhoto: null,
  emailVerified: true,
  phoneVerified: true,
  idVerified: false,
}

export default function ProfilePage() {
  const [user, setUser] = useState<MockUserData>(MOCK_USER)
  const [profilePhotoPreview, setProfilePhotoPreview] = useState<string | null>(null)
  const [isPasswordOpen, setIsPasswordOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isPasswordChanging, setIsPasswordChanging] = useState(false)

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      country: user.country,
      city: user.city,
      bio: user.bio,
      role: user.role,
    },
  })

  const passwordForm = useForm<ChangePasswordData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })

  const selectedCountry = form.watch("country")
  const availableCities = COUNTRIES.find(c => c.value === selectedCountry)
    ? CITIES_BY_COUNTRY[selectedCountry] || []
    : []

  const onProfilePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setProfilePhotoPreview(result)
      }
      reader.readAsDataURL(file)
    }
  }

  const onSubmit = async (data: ProfileFormData) => {
    setIsSaving(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      setUser({
        ...user,
        ...data,
        profilePhoto: profilePhotoPreview || user.profilePhoto,
      })
      setProfilePhotoPreview(null)
    } finally {
      setIsSaving(false)
    }
  }

  const onPasswordSubmit = async (data: ChangePasswordData) => {
    setIsPasswordChanging(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      passwordForm.reset()
      setIsPasswordOpen(false)
    } finally {
      setIsPasswordChanging(false)
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const displayPhoto = profilePhotoPreview || user.profilePhoto

  return (
    <div className="container py-8 md:py-12">
      <div className="max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Profile Settings</h1>
          <p className="text-muted-foreground mt-2">
            Manage your account information and preferences
          </p>
        </div>

        <div className="space-y-6">
          {/* Profile Photo Section */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Photo</CardTitle>
              <CardDescription>
                Upload a profile picture to help other users identify you
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-end gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={displayPhoto || undefined} alt={user.name} />
                  <AvatarFallback className="text-lg font-semibold">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <Label htmlFor="profile-photo" className="block mb-2">
                    Upload new photo
                  </Label>
                  <div className="flex items-center gap-3">
                    <Input
                      id="profile-photo"
                      type="file"
                      accept="image/*"
                      onChange={onProfilePhotoChange}
                      className="flex-1"
                    />
                    {profilePhotoPreview && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setProfilePhotoPreview(null)}
                      >
                        <X className="h-4 w-4 mr-2" />
                        Clear
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Edit Profile Form */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Update your basic profile information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Name Field */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Email Field */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="john@example.com" {...field} />
                        </FormControl>
                        <FormDescription>
                          Your email address is used for account recovery and notifications
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Country Field */}
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a country" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {COUNTRIES.map(country => (
                              <SelectItem key={country.value} value={country.value}>
                                {country.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* City Field */}
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a city" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {availableCities.map(city => (
                              <SelectItem key={city} value={city}>
                                {city}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Bio Field */}
                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                          <textarea
                            placeholder="Tell us about yourself..."
                            className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input min-h-[100px] w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none resize-vertical disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Max 500 characters. This will be displayed on your profile.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Role Selection */}
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Account Type</FormLabel>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your account type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="buyer">Buyer</SelectItem>
                            <SelectItem value="seller">Seller</SelectItem>
                            <SelectItem value="both">Buyer & Seller</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Choose whether you want to buy, sell, or do both on Pluribus
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" disabled={isSaving}>
                    {isSaving ? "Saving..." : "Save Changes"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Verification Status */}
          <Card>
            <CardHeader>
              <CardTitle>Verification Status</CardTitle>
              <CardDescription>
                Complete verification to increase trust and access more features
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center gap-3">
                    {user.emailVerified ? (
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-green-100">
                        <Check className="h-5 w-5 text-green-600" />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-100">
                        <X className="h-5 w-5 text-gray-600" />
                      </div>
                    )}
                    <div>
                      <p className="font-medium">Email Verification</p>
                      <p className="text-sm text-muted-foreground">
                        {user.emailVerified ? "Verified" : "Not verified"}
                      </p>
                    </div>
                  </div>
                  {!user.emailVerified && (
                    <Button variant="outline" size="sm">
                      Verify
                    </Button>
                  )}
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center gap-3">
                    {user.phoneVerified ? (
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-green-100">
                        <Check className="h-5 w-5 text-green-600" />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-100">
                        <X className="h-5 w-5 text-gray-600" />
                      </div>
                    )}
                    <div>
                      <p className="font-medium">Phone Verification</p>
                      <p className="text-sm text-muted-foreground">
                        {user.phoneVerified ? "Verified" : "Not verified"}
                      </p>
                    </div>
                  </div>
                  {!user.phoneVerified && (
                    <Button variant="outline" size="sm">
                      Verify
                    </Button>
                  )}
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center gap-3">
                    {user.idVerified ? (
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-green-100">
                        <Check className="h-5 w-5 text-green-600" />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-100">
                        <X className="h-5 w-5 text-gray-600" />
                      </div>
                    )}
                    <div>
                      <p className="font-medium">ID Verification</p>
                      <p className="text-sm text-muted-foreground">
                        {user.idVerified ? "Verified" : "Not verified"}
                      </p>
                    </div>
                  </div>
                  {!user.idVerified && (
                    <Button variant="outline" size="sm">
                      Verify
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Change Password Section */}
          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>
                Manage your password and security settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!isPasswordOpen ? (
                <Button
                  variant="outline"
                  onClick={() => setIsPasswordOpen(true)}
                >
                  Change Password
                </Button>
              ) : (
                <Form {...passwordForm}>
                  <form
                    onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={passwordForm.control}
                      name="currentPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Enter your current password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={passwordForm.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Enter a new password"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Must be at least 8 characters long
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={passwordForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm New Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Confirm your new password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex gap-3 pt-4">
                      <Button
                        type="submit"
                        disabled={isPasswordChanging}
                      >
                        {isPasswordChanging ? "Updating..." : "Update Password"}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setIsPasswordOpen(false)
                          passwordForm.reset()
                        }}
                        disabled={isPasswordChanging}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </Form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
