
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				youtube: {
					red: '#FF0000',
					darkRed: '#CC0000',
					light: '#F9F9F9'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			boxShadow: {
				'3d': '0 20px 30px -15px rgba(0, 0, 0, 0.3), 0 10px 15px -5px rgba(0, 0, 0, 0.2)',
				'inner-glow': 'inset 0 0 15px rgba(255, 255, 255, 0.3)',
				'tech': '0 0 15px rgba(0, 0, 0, 0.2), 0 0 5px rgba(255, 0, 0, 0.1)',
				'neon': '0 0 5px theme("colors.primary.DEFAULT"), 0 0 20px rgba(255, 0, 0, 0.2)',
				'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'pulse-light': {
					'0%, 100%': {
						opacity: '1'
					},
					'50%': {
						opacity: '0.7'
					}
				},
				'float': {
					'0%, 100%': {
						transform: 'translateY(0)'
					},
					'50%': {
						transform: 'translateY(-20px)'
					}
				},
				'glowing': {
					'0%': {
						'background-position': '0 0'
					},
					'50%': {
						'background-position': '400% 0'
					},
					'100%': {
						'background-position': '0 0'
					}
				},
				'rotate-3d': {
					'0%': {
						transform: 'perspective(1000px) rotateX(0) rotateY(0)'
					},
					'50%': {
						transform: 'perspective(1000px) rotateX(5deg) rotateY(5deg)'
					},
					'100%': {
						transform: 'perspective(1000px) rotateX(0) rotateY(0)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'pulse-light': 'pulse-light 2s ease-in-out infinite',
				'float': 'float 6s ease-in-out infinite',
				'glowing': 'glowing 20s linear infinite',
				'rotate-3d': 'rotate-3d 7s ease-in-out infinite'
			},
			backdropFilter: {
				'none': 'none',
				'blur': 'blur(8px)',
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
				'gradient-tech': 'linear-gradient(to right, #0f2027, #203a43, #2c5364)',
				'gradient-youtube': 'linear-gradient(45deg, #FF0000, #FF5E3A)',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
