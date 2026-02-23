'use client';

import { useState, useRef, ChangeEvent, useEffect } from 'react';
import { Camera, Loader2, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useTranslations } from '@/contexts/TranslationsContext';
import { apiClient } from '@/lib/api';
import { toast } from 'sonner';

interface AvatarUploadProps {
  currentAvatar?: string;
  userName: string;
  onUploadSuccess?: (url: string) => void;
  disabled?: boolean;
}

export function AvatarUpload({
  currentAvatar,
  userName,
  onUploadSuccess,
  disabled = false,
}: AvatarUploadProps) {
  const { t } = useTranslations();
  const [avatar, setAvatar] = useState<string | undefined>(currentAvatar);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update avatar state when currentAvatar prop changes
  useEffect(() => {
    setAvatar(currentAvatar);
  }, [currentAvatar]);

  const getUserInitial = () => {
    return userName.charAt(0).toUpperCase();
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      toast.error(t('components.avatarUpload.invalidType'));
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error(t('components.avatarUpload.fileTooLarge'));
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('avatar', file);

      const response = await apiClient.post('/upload/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const { url } = response.data.data;
      setAvatar(url);
      toast.success(t('components.avatarUpload.success'));

      if (onUploadSuccess) {
        onUploadSuccess(url);
      }
    } catch (error) {
      console.error('Avatar upload error:', error);
      toast.error(t('components.avatarUpload.error'));
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = async () => {
    if (!avatar) return;

    setUploading(true);

    try {
      await apiClient.delete('/upload/image', {
        data: { url: avatar },
      });

      setAvatar(undefined);
      toast.success(t('components.avatarUpload.removed'));

      if (onUploadSuccess) {
        onUploadSuccess('');
      }
    } catch (error) {
      console.error('Avatar removal error:', error);
      toast.error(t('components.avatarUpload.removeError'));
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        onChange={handleFileChange}
        disabled={disabled || uploading}
        className="hidden"
      />

      <div className="relative">
        <Avatar className="h-32 w-32">
          <AvatarImage src={avatar} alt={userName} />
          <AvatarFallback className="text-4xl">
            {getUserInitial()}
          </AvatarFallback>
        </Avatar>

        {!disabled && (
          <Button
            type="button"
            size="icon"
            variant="secondary"
            className="absolute bottom-0 right-0 rounded-full h-10 w-10"
            onClick={handleClick}
            disabled={uploading}
          >
            {uploading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Camera className="h-5 w-5" />
            )}
          </Button>
        )}
      </div>

      <div className="flex gap-2">
        {!disabled && (
          <>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleClick}
              disabled={uploading}
            >
              {uploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t('components.avatarUpload.uploading')}
                </>
              ) : (
                <>
                  <Camera className="mr-2 h-4 w-4" />
                  {avatar
                    ? t('components.avatarUpload.change')
                    : t('components.avatarUpload.upload')}
                </>
              )}
            </Button>

            {avatar && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleRemove}
                disabled={uploading}
              >
                <X className="mr-2 h-4 w-4" />
                {t('components.avatarUpload.remove')}
              </Button>
            )}
          </>
        )}
      </div>

      <p className="text-xs text-muted-foreground text-center">
        {t('components.avatarUpload.hint')}
      </p>
    </div>
  );
}
