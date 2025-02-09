import type { Preview } from "@storybook/react";
import "@/styles/globals.css"; // Ensure this path matches where your Tailwind styles are
import { withThemeByClassName } from "@storybook/addon-themes";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#ffffff" },
        { name: "dark", value: "#0f172a" },
      ],
    },
  },
  decorators: [
    withThemeByClassName({
      themes: {
        light: "",
        dark: "dark", // This enables dark mode for ShadCN
      },
      defaultTheme: "light",
    }),
  ],
};

export default preview;
