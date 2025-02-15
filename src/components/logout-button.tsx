// src/components/logout-button.tsx
import { logout } from "@/app/actions/logout";

export default function LogoutButton() {
  return (
    <form action={logout}>
      <button type="submit">Log Out</button>
    </form>
  );
}
