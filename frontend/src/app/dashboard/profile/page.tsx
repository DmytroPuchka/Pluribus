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
import { useTranslations } from '@/contexts/TranslationsContext'

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
  const { t } = useTranslations()
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
          <h1 className="text-3xl font-bold tracking-tight">{t('pages.dashboard.profile.title')}</h1>
          <p className="text-muted-foreground mt-2">
            {t('pages.dashboard.profile.subtitle')}
          </p>
        </div>

        <div className="space-y-6">
          {/* Profile Photo Section */}
          <Card>
            <CardHeader>
              <CardTitle>{t('pages.dashboard.profile.photo.title')}</CardTitle>
              <CardDescription>
                {t('pages.dashboard.profile.photo.description')}
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
                    {t('pages.dashboard.profile.photo.upload')}
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
                        {t('pages.dashboard.profile.photo.clear')}
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
              <CardTitle>{t('pages.dashboard.profile.personalInfo.title')}</CardTitle>
              <CardDescription>
                {t('pages.dashboard.profile.personalInfo.description')}
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
                        <FormLabel>{t('pages.dashboard.profile.personalInfo.name')}</FormLabel>
                        <FormControl>
                          <Input placeholder={t('pages.dashboard.profile.personalInfo.namePlaceholder')} {...field} />
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
                        <FormLabel>{t('pages.dashboard.profile.personalInfo.email')}</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder={t('pages.dashboard.profile.personalInfo.emailPlaceholder')} {...field} />
                        </FormControl>
                        <FormDescription>
                          {t('pages.dashboard.profile.personalInfo.emailDescription')}
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
                        <FormLabel>{t('pages.dashboard.profile.personalInfo.country')}</FormLabel>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={t('pages.dashboard.profile.personalInfo.countryPlaceholder')} />
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
                        <FormLabel>{t('pages.dashboard.profile.personalInfo.city')}</FormLabel>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={t('pages.dashboard.profile.personalInfo.cityPlaceholder')} />
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
                        <FormLabel>{t('pages.dashboard.profile.personalInfo.bio')}</FormLabel>
                        <FormControl>
                          <textarea
                            placeholder={t('pages.dashboard.profile.personalInfo.bioPlaceholder')}
                            className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input min-h-[100px] w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none resize-vertical disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          {t('pages.dashboard.profile.personalInfo.bioDescription')}
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
                        <FormLabel>{t('pages.dashboard.profile.personalInfo.role')}</FormLabel>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={t('pages.dashboard.profile.personalInfo.rolePlaceholder')} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="buyer">{t('pages.dashboard.profile.personalInfo.roleBuyer')}</SelectItem>
                            <SelectItem value="seller">{t('pages.dashboard.profile.personalInfo.roleSeller')}</SelectItem>
                            <SelectItem value="both">{t('pages.dashboard.profile.personalInfo.roleBoth')}</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          {t('pages.dashboard.profile.personalInfo.roleDescription')}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" disabled={isSaving}>
                    {isSaving ? t('pages.dashboard.profile.personalInfo.saving') : t('pages.dashboard.profile.personalInfo.saveChanges')}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Verification Status */}
          <Card>
            <CardHeader>
              <CardTitle>{t('pages.dashboard.profile.verification.title')}</CardTitle>
              <CardDescription>
                {t('pages.dashboard.profile.verification.description')}
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
                      <p className="font-medium">{t('pages.dashboard.profile.verification.email')}</p>
                      <p className="text-sm text-muted-foreground">
                        {user.emailVerified ? t('pages.dashboard.profile.verification.verified') : t('pages.dashboard.profile.verification.notVerified')}
                      </p>
                    </div>
                  </div>
                  {!user.emailVerified && (
                    <Button variant="outline" size="sm">
                      {t('pages.dashboard.profile.verification.verify')}
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
                      <p className="font-medium">{t('pages.dashboard.profile.verification.phone')}</p>
                      <p className="text-sm text-muted-foreground">
                        {user.phoneVerified ? t('pages.dashboard.profile.verification.verified') : t('pages.dashboard.profile.verification.notVerified')}
                      </p>
                    </div>
                  </div>
                  {!user.phoneVerified && (
                    <Button variant="outline" size="sm">
                      {t('pages.dashboard.profile.verification.verify')}
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
                      <p className="font-medium">{t('pages.dashboard.profile.verification.id')}</p>
                      <p className="text-sm text-muted-foreground">
                        {user.idVerified ? t('pages.dashboard.profile.verification.verified') : t('pages.dashboard.profile.verification.notVerified')}
                      </p>
                    </div>
                  </div>
                  {!user.idVerified && (
                    <Button variant="outline" size="sm">
                      {t('pages.dashboard.profile.verification.verify')}
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Change Password Section */}
          <Card>
            <CardHeader>
              <CardTitle>{t('pages.dashboard.profile.security.title')}</CardTitle>
              <CardDescription>
                {t('pages.dashboard.profile.security.description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!isPasswordOpen ? (
                <Button
                  variant="outline"
                  onClick={() => setIsPasswordOpen(true)}
                >
                  {t('pages.dashboard.profile.security.changePassword')}
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
                          <FormLabel>{t('pages.dashboard.profile.security.currentPassword')}</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder={t('pages.dashboard.profile.security.currentPasswordPlaceholder')}
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
                          <FormLabel>{t('pages.dashboard.profile.security.newPassword')}</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder={t('pages.dashboard.profile.security.newPasswordPlaceholder')}
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            {t('pages.dashboard.profile.security.newPasswordDescription')}
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
                          <FormLabel>{t('pages.dashboard.profile.security.confirmPassword')}</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder={t('pages.dashboard.profile.security.confirmPasswordPlaceholder')}
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
                        {isPasswordChanging ? t('pages.dashboard.profile.security.updating') : t('pages.dashboard.profile.security.updatePassword')}
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
                        {t('pages.dashboard.profile.security.cancel')}
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
