'use client';

import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { logout } from '@/app/actions/logout';

export default function LogoutButton() {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => logout()}
      className="h-9 w-9 rounded-md hover:text-primary"
      title="Sign out"
    >
      <LogOut className="h-5 w-5" />
    </Button>
  );
}
