"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Upload, Check, X, ArrowLeft, Star } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

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
import { useAuth } from '@/contexts/AuthContext'
import { usersService } from '@/lib/api'
import { toast } from 'sonner'
import { CountrySelect } from '@/components/CountrySelect'
import { getSortedCountries } from '@/utils/countries'
import { Checkbox } from '@/components/ui/checkbox'

export default function ProfilePage() {
  const { t, language } = useTranslations()
  const { user, refreshUser, isLoading: authLoading } = useAuth()
  const router = useRouter()
  const [profilePhotoPreview, setProfilePhotoPreview] = useState<string | null>(null)
  const [isPasswordOpen, setIsPasswordOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isPasswordChanging, setIsPasswordChanging] = useState(false)
  const [deliveryCountrySearch, setDeliveryCountrySearch] = useState('')
  const [stats, setStats] = useState({
    averageRating: 0,
    totalReviews: 0,
  })
  const [isLoadingStats, setIsLoadingStats] = useState(true)

  // Get sorted countries based on current language
  const sortedCountries = getSortedCountries(language)

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login')
    }
  }, [user, authLoading, router])

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      country: user?.country || '',
      city: user?.city || '',
      bio: user?.bio || '',
      role: user?.role || 'BUYER',
      deliveryCountries: user?.deliveryCountries || [],
    },
  })

  // Update form when user data loads
  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name,
        email: user.email,
        country: user.country,
        city: user.city,
        bio: user.bio || '',
        role: user.role,
        deliveryCountries: user.deliveryCountries || [],
      })
    }
  }, [user, form])

  // Fetch user stats (for seller rating)
  useEffect(() => {
    const fetchStats = async () => {
      if (!user || user.role !== 'SELLER') {
        setIsLoadingStats(false)
        return
      }

      try {
        const userStats = await usersService.getUserStats()
        setStats({
          averageRating: userStats.averageRating,
          totalReviews: userStats.totalReviews,
        })
      } catch (error) {
        console.error('Failed to fetch user stats:', error)
      } finally {
        setIsLoadingStats(false)
      }
    }

    fetchStats()
  }, [user])

  // Watch the role field to show/hide delivery countries
  const selectedRole = form.watch('role')

  // Filter countries based on search
  const filteredCountries = sortedCountries.filter((country) => {
    const searchLower = deliveryCountrySearch.toLowerCase();
    const countryName = language === 'uk' ? country.uk : country.en;
    return countryName.toLowerCase().includes(searchLower) ||
           country.en.toLowerCase().includes(searchLower);
  })

  const passwordForm = useForm<ChangePasswordData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })

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
      // Update profile via API
      await usersService.updateProfile({
        name: data.name,
        bio: data.bio,
        country: data.country,
        city: data.city,
        deliveryCountries: data.role === 'SELLER' ? data.deliveryCountries : undefined,
        // TODO: Add avatar upload with Cloudinary
      })

      // Refresh user data
      await refreshUser()

      toast.success('Profile updated!', {
        description: 'Your profile has been updated successfully.',
      })

      setProfilePhotoPreview(null)
    } catch (error: any) {
      console.error('Profile update error:', error)
      const errorMessage = error?.response?.data?.error || 'Failed to update profile'
      toast.error('Update failed', {
        description: errorMessage,
      })
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

  const displayPhoto = profilePhotoPreview || user?.avatar

  // Show loading state
  if (authLoading || !user) {
    return (
      <div className="container py-8 md:py-12">
        <div className="max-w-4xl">
          <div className="mb-8">
            <div className="h-8 bg-muted animate-pulse rounded w-1/3 mb-2" />
            <div className="h-4 bg-muted animate-pulse rounded w-1/2" />
          </div>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="h-6 bg-muted animate-pulse rounded w-1/4" />
              </CardHeader>
              <CardContent>
                <div className="h-32 bg-muted animate-pulse rounded" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="max-w-4xl">
        {/* Back Button */}
        <div className="mb-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              {t('common.buttons.back')}
            </Link>
          </Button>
        </div>

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
                        <FormControl>
                          <CountrySelect
                            value={field.value}
                            onValueChange={field.onChange}
                            placeholder={t('pages.dashboard.profile.personalInfo.countryPlaceholder')}
                            searchPlaceholder={t('pages.dashboard.profile.personalInfo.countrySearchPlaceholder')}
                            emptyMessage={t('pages.dashboard.profile.personalInfo.countryEmptyMessage')}
                            language={language}
                          />
                        </FormControl>
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
                        <FormControl>
                          <Input
                            placeholder={t('pages.dashboard.profile.personalInfo.cityPlaceholder')}
                            {...field}
                          />
                        </FormControl>
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
                            <SelectItem value="BUYER">{t('pages.dashboard.profile.personalInfo.roleBuyer')}</SelectItem>
                            <SelectItem value="SELLER">{t('pages.dashboard.profile.personalInfo.roleSeller')}</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          {t('pages.dashboard.profile.personalInfo.roleDescription')}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Delivery Countries Field - Only for Sellers */}
                  {selectedRole === 'SELLER' && (
                    <FormField
                      control={form.control}
                      name="deliveryCountries"
                      render={() => (
                        <FormItem>
                          <FormLabel>{t('auth.signup.deliveryCountries')}</FormLabel>
                          <FormDescription className="text-xs mb-3">
                            {t('auth.signup.deliveryCountriesDescription')}
                          </FormDescription>
                          <div className="mb-3">
                            <Input
                              type="text"
                              placeholder={t('auth.onboarding.location.countrySearchPlaceholder')}
                              value={deliveryCountrySearch}
                              onChange={(e) => setDeliveryCountrySearch(e.target.value)}
                              disabled={isSaving}
                              className="w-full"
                            />
                          </div>
                          <div className="border rounded-md p-4 max-h-60 overflow-y-auto space-y-3">
                            {filteredCountries.length > 0 ? (
                              filteredCountries.map((country) => (
                                <FormField
                                  key={country.code}
                                  control={form.control}
                                  name="deliveryCountries"
                                  render={({ field }) => {
                                    const countryName = language === 'uk' ? country.uk : country.en;
                                    return (
                                      <FormItem
                                        key={country.code}
                                        className="flex flex-row items-center space-x-3 space-y-0"
                                      >
                                        <FormControl>
                                          <Checkbox
                                            checked={field.value?.includes(country.en)}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([...(field.value || []), country.en])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) => value !== country.en
                                                    )
                                                  );
                                            }}
                                            disabled={isSaving}
                                          />
                                        </FormControl>
                                        <FormLabel className="font-normal cursor-pointer">
                                          {countryName}
                                        </FormLabel>
                                      </FormItem>
                                    );
                                  }}
                                />
                              ))
                            ) : (
                              <p className="text-sm text-muted-foreground text-center py-4">
                                {t('auth.onboarding.location.countryEmptyMessage')}
                              </p>
                            )}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

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

          {/* Seller Rating Section - Only for Sellers */}
          {user.role === 'SELLER' && (
            <Card>
              <CardHeader>
                <CardTitle>{t('pages.dashboard.profile.rating.title')}</CardTitle>
                <CardDescription>
                  {t('pages.dashboard.profile.rating.description')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingStats ? (
                  <div className="h-20 bg-muted animate-pulse rounded" />
                ) : (
                  <div className="flex items-center gap-6">
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-yellow-100">
                      <Star className="h-8 w-8 text-yellow-600 fill-yellow-600" />
                    </div>
                    <div>
                      {stats.totalReviews > 0 ? (
                        <>
                          <p className="text-3xl font-bold">
                            {stats.averageRating.toFixed(1)} <span className="text-yellow-600">★</span>
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {t('pages.dashboard.profile.rating.reviewsCount', { count: stats.totalReviews })}
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="text-xl font-semibold text-muted-foreground">
                            {t('pages.dashboard.stats.noRatings')}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {t('pages.dashboard.profile.rating.noReviewsYet')}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

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
