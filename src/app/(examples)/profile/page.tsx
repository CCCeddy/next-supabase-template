'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { createClient } from '@/utils/supabase/client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LogOut, Mail, Shield, Clock, Key, RefreshCw, Info, User, Trash2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { deleteUser } from '@/app/(auth-pages)/actions';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div className="relative z-50 w-full max-w-md rounded-lg bg-background p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-bold">Delete Account</h2>
        <p className="mb-6 text-muted-foreground">
          Are you absolutely sure? This action cannot be undone. This will permanently delete your
          account and remove all your data from our servers.
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  );
};

// Helper function to format dates consistently throughout the app
function formatDate(date: string | null | undefined) {
  if (!date) return 'N/A';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

// Reusable component for displaying user information fields
function UserInfoItem({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border p-4">
      <Icon className="h-5 w-5 text-muted-foreground" />
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}

export default function ProfileExample() {
  const { user } = useAuth();
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [refreshCount, setRefreshCount] = useState(0);
  const [username, setUsername] = useState(user?.user_metadata?.username || '');
  const [showRawData, setShowRawData] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle username update
  const handleUpdateUsername = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.updateUser({
        data: { username },
      });
      if (error) throw error;

      // Show success message (you might want to add a toast notification here)
      console.log('Username updated successfully');
    } catch (error) {
      console.error('Error updating username:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle sign out
  const handleSignOut = async () => {
    try {
      setIsLoading(true);
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle session refresh
  const handleRefreshSession = async () => {
    try {
      setIsLoading(true);
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) throw error;
      setRefreshCount((prev) => prev + 1);
    } catch (error) {
      console.error('Error refreshing session:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      setIsLoading(true);
      const result = await deleteUser();

      if (result.error) {
        setError(result.error);
        setIsDeleteModalOpen(false);
        return;
      }

      if (result.success) {
        window.location.href = '/';
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Show login prompt if user is not authenticated
  if (!user) {
    return (
      <div className="container mx-auto py-8">
        <Card className="mx-auto max-w-2xl p-6">
          <div className="text-center">
            <h1 className="text-xl font-semibold">Not Logged In</h1>
            <p className="mt-2 text-muted-foreground">Please sign in to view your profile</p>
            <Button className="mt-4" asChild>
              <a href="/login">Sign In</a>
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      {/* Educational section */}
      <Card className="mb-8 p-6">
        <h2 className="mb-4 text-xl font-semibold">🎓 Learning User Profile Management</h2>
        <div className="prose dark:prose-invert">
          <p>
            This example demonstrates how to implement user profile management with Supabase Auth:
          </p>
          <ul className="space-y-2">
            <li>
              <strong>Session Management:</strong> Handling user sessions and authentication state
            </li>
            <li>
              <strong>Profile Information:</strong> Displaying and updating user profile data
            </li>
            <li>
              <strong>Custom Metadata:</strong> Managing additional user data like username
            </li>
            <li>
              <strong>Security Features:</strong> Managing passwords and security settings
            </li>
          </ul>
        </div>
      </Card>

      {/* Profile Management Section */}
      <Card className="mb-8 p-6">
        <h2 className="mb-4 text-xl font-semibold">👤 Profile Management</h2>
        <div className="space-y-6">
          {/* Username update form */}
          <div className="space-y-4">
            <label className="block text-sm font-medium">Username</label>
            <div className="flex gap-2">
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                disabled={isLoading}
              />
              <Button onClick={handleUpdateUsername} disabled={isLoading}>
                Update Username
              </Button>
            </div>
          </div>

          {/* Basic profile information */}
          <div className="grid gap-4">
            <UserInfoItem
              icon={Mail}
              label="Email Address"
              value={user.email || 'No email provided'}
            />
            <UserInfoItem
              icon={User}
              label="Username"
              value={user.user_metadata?.username || 'Not set'}
            />
            <UserInfoItem
              icon={Shield}
              label="Auth Provider"
              value={user.app_metadata.provider || 'Email'}
            />
            <UserInfoItem
              icon={Clock}
              label="Last Sign In"
              value={formatDate(user.last_sign_in_at)}
            />
          </div>
        </div>
      </Card>

      {/* Test Controls */}
      <Card className="mb-8 p-6">
        <h2 className="mb-4 text-xl font-semibold">🔧 Test Controls</h2>
        <div className="space-y-4">
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={handleRefreshSession}
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh Session
            </Button>
            <Button
              variant="outline"
              onClick={handleSignOut}
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowRawData(!showRawData)}
              className="flex items-center gap-2"
            >
              <Info className="h-4 w-4" />
              {showRawData ? 'Hide' : 'Show'} Raw Data
            </Button>
            <Button
              variant="destructive"
              disabled={isLoading}
              onClick={() => setIsDeleteModalOpen(true)}
              className="flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Delete Account
            </Button>
          </div>

          {refreshCount > 0 && (
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Session Refreshed</AlertTitle>
              <AlertDescription>
                Session has been refreshed {refreshCount} time{refreshCount !== 1 ? 's' : ''}
              </AlertDescription>
            </Alert>
          )}

          {/* Raw user data for development */}
          {showRawData && (
            <div className="mt-4">
              <h3 className="mb-2 text-lg font-semibold">Raw User Data:</h3>
              <pre className="overflow-auto rounded-md bg-muted p-4 text-sm">
                {JSON.stringify(user, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </Card>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteAccount}
      />

      {/* Implementation Guide */}
      <Card className="p-6">
        <h2 className="mb-4 text-xl font-semibold">📚 Implementation Guide</h2>
        <div className="prose dark:prose-invert">
          <h3>1. Update User Metadata:</h3>
          <pre className="rounded-md bg-muted p-4">
            {`const { data, error } = await supabase.auth.updateUser({
  data: { username: 'newUsername' }
});`}
          </pre>

          <h3>2. Access User Metadata:</h3>
          <pre className="rounded-md bg-muted p-4">
            {`// Access custom user data
const username = user.user_metadata?.username;
const customData = user.user_metadata?.custom_field;`}
          </pre>

          <div className="mt-4 rounded-md bg-blue-500/10 p-4">
            <h4 className="font-semibold">💡 Pro Tips:</h4>
            <ul className="mt-2">
              <li>Store additional user data in user_metadata</li>
              <li>Use TypeScript interfaces for metadata structure</li>
              <li>Implement proper validation before updates</li>
              <li>Consider adding avatar/profile picture support</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
