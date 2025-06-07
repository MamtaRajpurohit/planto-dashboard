"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import Input from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";
import { Eye, EyeOff, Trash } from "lucide-react";

type FormValues = {
  name: string;
  email: string;
  notifications: boolean;
  darkMode: boolean;
  language: string;
  enable2FA: boolean;
  password: string;
  newPassword: string;
};

export default function SettingsForm() {
  const { isDark, toggle } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      email: "",
      notifications: true,
      darkMode: isDark,
      language: "en",
      enable2FA: false,
      password: "",
      newPassword: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    alert("Settings saved!");
    if (data.darkMode !== isDark) toggle();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfilePicture(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-14">

      {/* PROFILE SECTION */}
      <section className="space-y-8 border-b border-emerald-300 dark:border-emerald-700 pb-10">
        <h3 className="text-2xl font-semibold text-emerald-600 dark:text-emerald-400">
          Profile Information
        </h3>

        <div className="flex items-center gap-8">
          {profilePicture ? (
            <img
              src={profilePicture}
              alt="Profile"
              className="h-20 w-20 rounded-full object-cover border-2 border-emerald-400 shadow-md transition-transform duration-300 hover:scale-105"
            />
          ) : (
            <div className="h-20 w-20 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-sm font-medium text-gray-500 dark:text-gray-400 select-none">
              No Image
            </div>
          )}

          <div className="flex flex-col">
            <Label htmlFor="profile" className="mb-1 font-medium">
              Upload Profile Picture
            </Label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mt-1 text-sm cursor-pointer text-emerald-600 dark:text-emerald-400"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="name" className="font-medium">Name</Label>
          <Input
            id="name"
            placeholder="Your name"
            {...register("name", { required: "Name is required." })}
            className={`${errors.name ? "border-red-500" : ""}`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="email" className="font-medium">Email</Label>
          <Input
            id="email"
            placeholder="you@example.com"
            {...register("email", {
              required: "Email is required.",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address.",
              },
            })}
            className={`${errors.email ? "border-red-500" : ""}`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
      </section>

      {/* PASSWORD SECTION */}
      <section className="space-y-8 border-b border-emerald-300 dark:border-emerald-700 pb-10">
        <h3 className="text-2xl font-semibold text-emerald-600 dark:text-emerald-400">
          Password Settings
        </h3>

        <div>
          <Label htmlFor="password" className="font-medium">Current Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter current password"
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-emerald-600 transition"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <div>
          <Label htmlFor="newPassword" className="font-medium">New Password</Label>
          <div className="relative">
            <Input
              id="newPassword"
              type={showNewPassword ? "text" : "password"}
              placeholder="Enter new password"
              {...register("newPassword")}
            />
            <button
              type="button"
              onClick={() => setShowNewPassword((p) => !p)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-emerald-600 transition"
              aria-label={showNewPassword ? "Hide password" : "Show password"}
            >
              {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
      </section>

      {/* PREFERENCES SECTION */}
      <section className="space-y-8 border-b border-emerald-300 dark:border-emerald-700 pb-10">
        <h3 className="text-2xl font-semibold text-emerald-600 dark:text-emerald-400">
          Preferences
        </h3>

        <div className="flex justify-between items-center">
          <span>Receive Notifications</span>
          <Controller
            name="notifications"
            control={control}
            render={({ field }) => (
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            )}
          />
        </div>

        <div className="flex justify-between items-center">
          <span>Dark Mode</span>
          <Controller
            name="darkMode"
            control={control}
            render={({ field }) => (
              <Switch
                checked={field.value}
                onCheckedChange={(val) => {
                  field.onChange(val);
                  toggle();
                }}
              />
            )}
          />
        </div>

        <div className="flex justify-between items-center">
          <span>Enable Two-Factor Authentication</span>
          <Controller
            name="enable2FA"
            control={control}
            render={({ field }) => (
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            )}
          />
        </div>

        <div>
          <Label htmlFor="language" className="font-medium">Language</Label>
          <select
            id="language"
            {...register("language")}
            className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition"
          >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="es">Spanish</option>
          </select>
        </div>
      </section>

      {/* SAVE BUTTON */}
      <div className="flex justify-end">
        <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 transition-transform active:scale-95">
          Save Changes
        </Button>
      </div>

      {/* DANGER ZONE */}
      <section className="mt-14 border-t border-red-500 pt-8">
        <h3 className="text-red-600 text-2xl font-semibold mb-3">Danger Zone</h3>
        <p className="text-sm text-red-500 mb-6 max-w-xl">
          Once you delete your account, there&apos;s no going back. Please be absolutely sure.
        </p>
        <Button variant="destructive" className="flex gap-3 items-center justify-center transition-transform active:scale-95">
          <Trash size={20} />
          Delete Account
        </Button>
      </section>
    </form>
  );
}



