# Design System: Luminous Clarity

## 1. Overview & Creative North Star: "The Digital Mentor"
The North Star for this design system is **"The Digital Mentor."** For a student navigating the high-stakes environment of placement preparation, the UI must act as a calm, authoritative, yet breathable space. We move beyond the "standard SaaS dashboard" by embracing **Luminous Clarity**—a philosophy that prioritizes cognitive ease through atmospheric depth rather than structural rigidity.

To break the "template" look, this system utilizes **intentional asymmetry** and **tonal layering**. We avoid the claustrophobia of boxes-within-boxes. Instead, we use expansive white space and overlapping glass surfaces to create a sense of momentum and "academic flow." The goal is a premium, editorial feel that treats a student’s career journey with the prestige it deserves.

---

## 2. Colors & Surface Philosophy
The palette is anchored in high-chroma Indigos and deep Purples, set against an ethereal foundation of "Cool Liquid" neutrals.

### The "No-Line" Rule
**Borders are a failure of hierarchy.** Within this system, 1px solid borders are prohibited for sectioning. Boundaries must be defined through:
*   **Background Shifts:** Transitioning from `surface` (#f7f9fb) to `surface-container-low` (#f2f4f6).
*   **Tonal Transitions:** Using subtle shifts in the surface-container tiers to denote functional changes.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. Use the following logic for nesting:
*   **Base Layer:** `surface` (#f7f9fb) for the main application background.
*   **Section Layer:** `surface-container-low` (#f2f4f6) for large sidebars or secondary content regions.
*   **Content Layer:** `surface-container-lowest` (#ffffff) for the primary cards or workspace areas to provide a "pop" of clarity.
*   **Interaction Layer:** `surface-bright` for hover states or active focus areas.

### The "Glass & Gradient" Rule
To inject "soul" into the placement experience:
*   **Glassmorphism:** For floating modals, navigation bars, or "Next Step" prompts, use semi-transparent `surface` colors with a `backdrop-blur` of 12px–20px. 
*   **Signature Textures:** Main CTAs should not be flat. Apply a subtle linear gradient from `primary` (#3525cd) to `primary-container` (#4f46e5) at a 135-degree angle to create a sense of "illuminated depth."

---

## 3. Typography: Editorial Authority
We use **Manrope** exclusively. Its geometric yet humanist qualities provide a modern, approachable bridge between "Tech" and "Education."

*   **Display (lg/md/sm):** Used for "Hero" moments (e.g., "Your Career Starts Here"). Set with tight letter-spacing (-0.02em) to feel impactful and custom.
*   **Headline (lg/md/sm):** Reserved for page titles. Use `on-surface` (#191c1e) to ensure high-contrast authority.
*   **Title (lg/md/sm):** Used for card headers and section titles. These act as the primary signposts for the student.
*   **Body (lg/md):** The workhorse for interview tips and job descriptions. Always use `on-surface-variant` (#464555) for long-form text to reduce eye strain compared to pure black.
*   **Label (md/sm):** Used for "Micro-copy" (tags, timestamps). These can utilize the `tertiary` (#6b00b7) or `primary` tones to draw attention to status.

---

## 4. Elevation & Depth
In this design system, elevation is a feeling, not a drop-shadow.

*   **The Layering Principle:** Depth is achieved by "stacking." Place a `surface-container-lowest` card on top of a `surface-container-low` background. This creates a soft, natural lift that feels architectural rather than digital.
*   **Ambient Shadows:** For floating elements (like a "Mock Interview" fab), use an "Ambient Lift":
    *   `box-shadow: 0 12px 32px -4px rgba(73, 70, 229, 0.06);`
    *   *Note: Use a hint of the primary indigo in the shadow to mimic natural light refraction.*
*   **The "Ghost Border":** If a border is required for accessibility (e.g., in high-density data tables), use the `outline-variant` (#c7c4d8) at **15% opacity**. Never use a 100% opaque border.

---

## 5. Components

### Buttons
*   **Primary:** Gradient (Primary to Primary-Container), `ROUND_FOUR` (0.5rem) corners, white text. On hover, increase the gradient intensity.
*   **Secondary:** Ghost style. No background, `outline-variant` (Ghost Border style), `primary` text.
*   **Micro-interaction:** On click, scale the button to 0.98 to provide tactile "squish" feedback.

### Cards & Lists
*   **Forbid Dividers:** Use `1.5rem` of vertical white space or a change from `surface-container-lowest` to `surface-container` backgrounds to separate list items.
*   **Placement Cards:** Use Glassmorphism for "Featured" job roles to make them shimmer against the standard list.

### Input Fields
*   **State:** Default state uses `surface-container-high` background with no border. 
*   **Focus State:** Transitions to `surface-container-lowest` with a 2px "Luminous" glow using `primary` at 20% opacity.

### Progress Indicators (Custom)
*   For student progress, use a "Luminous Track": A `surface-container-highest` background with a `tertiary` (#6b00b7) to `primary` gradient fill.

---

## 6. Do’s and Don'ts

### Do
*   **Do** use asymmetrical margins (e.g., wider left margins) to give the layout an editorial, high-end feel.
*   **Do** use `ROUND_FOUR` (0.5rem) for almost everything to maintain a "friendly-modern" consistency.
*   **Do** leverage `tertiary_container` (#862dd4) for "Success" states (like passing a mock test) to keep the palette sophisticated.

### Don't
*   **Don't** use 100% black (#000000). It breaks the "Luminous" effect. Use `on-surface` (#191c1e).
*   **Don't** use heavy, dark shadows. If the shadow looks like a shadow, it’s too dark. It should look like a "glow."
*   **Don't** use dividers to separate content. Let the whitespace and tonal shifts do the heavy lifting.