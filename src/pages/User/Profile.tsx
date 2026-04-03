import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, User, Phone, MapPin, Shield, Calendar } from "lucide-react";
import ProfileForm from "@/components/modules/User/ProfileForm";
import { Skeleton } from "@/components/ui/skeleton";
import { useCallback, useState } from "react";

const Profile = () => {
  const { data: userResponse, isLoading, refetch } = useUserInfoQuery(undefined);
  const [, setIsUpdating] = useState(false);

  const user = userResponse?.data;

  const handleUpdateSuccess = useCallback(() => {
    setIsUpdating(true);
    // Refetch user data after successful update
    refetch();
    setIsUpdating(false);
  }, [refetch]);

  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
        <Skeleton className="h-12 w-32" />
        <div className="grid gap-6 md:grid-cols-2">
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="w-full max-w-4xl mx-auto p-4">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <p className="text-red-600">Failed to load user profile</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">My Profile</h1>
        <p className="text-muted-foreground">
          View and manage your personal information
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* User Info Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Information
            </CardTitle>
            <CardDescription>Your account details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Name */}
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Name</p>
              <p className="text-lg font-semibold">{user.name}</p>
            </div>

            {/* Email */}
            <div className="space-y-1">
              <p className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Mail className="h-4 w-4" />
                Email
              </p>
              <p className="text-base">{user.email}</p>
            </div>

            {/* Phone */}
            <div className="space-y-1">
              <p className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Phone className="h-4 w-4" />
                Phone
              </p>
              <p className="text-base">{user.phone || "Not provided"}</p>
            </div>

            {/* Address */}
            <div className="space-y-1">
              <p className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <MapPin className="h-4 w-4" />
                Address
              </p>
              <p className="text-base">{user.address || "Not provided"}</p>
            </div>

            {/* Role */}
            <div className="space-y-1">
              <p className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Shield className="h-4 w-4" />
                Role
              </p>
              <p className="inline-block px-2 py-1 text-sm font-medium rounded-md bg-primary/10 text-primary">
                {user.role}
              </p>
            </div>

            {/* Status */}
            <div className="space-y-1">
              <p className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Calendar className="h-4 w-4" />
                Status
              </p>
              <div className="space-y-1">
                <p className="text-sm">
                  <span className="text-muted-foreground">Verified: </span>
                  <span
                    className={`font-semibold ${
                      user.isVerified ? "text-green-600" : "text-yellow-600"
                    }`}
                  >
                    {user.isVerified ? "Yes" : "No"}
                  </span>
                </p>
                <p className="text-sm">
                  <span className="text-muted-foreground">Active: </span>
                  <span
                    className={`font-semibold ${
                      user.isActive === "ACTIVE"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {user.isActive || "ACTIVE"}
                  </span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Edit Profile Form */}
        <div>
          <ProfileForm user={user} onSuccess={handleUpdateSuccess} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
