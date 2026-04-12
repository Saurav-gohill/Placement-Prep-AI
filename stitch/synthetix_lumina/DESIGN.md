# Design System Specification: High-End Editorial AI Experience

## 1. Overview & Creative North Star: "The Predictive Prism"
This design system moves beyond the rigid, boxy layouts of traditional EdTech. The "Creative North Star" is **The Predictive Prism**—a concept where the interface feels like an intelligent, translucent medium that organizes complex data into clear, actionable paths. 

To achieve the "Linear/Vercel" aesthetic, we avoid "template" layouts. We embrace **intentional asymmetry**: large, bold typographic headers paired with compact, high-density data modules. We use overlapping elements and varying "glass" densities to create a sense of depth, ensuring the platform feels like a high-end tool for professionals, not a generic classroom.

---

### 2. Colors & Surface Philosophy
The palette is rooted in deep midnight tones (`#0b1326`) with ethereal highlights. It is designed to feel authoritative yet innovative.

#### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders to section off major areas of the UI. Separation must be achieved through:
- **Tonal Shifts:** Placing a `surface-container-low` module against a `background` floor.
- **Negative Space:** Using aggressive white space (24px+) to define boundaries.

#### Surface Hierarchy & Nesting
Treat the UI as a series of stacked, physical layers.
- **Base:** `surface` (#0b1326) – The deep foundation.
- **Sectioning:** `surface-container-low` (#131b2e) – Primary content zones.
- **Actionable Cards:** `surface-container-high` (#222a3d) – Interactive modules.
- **Floating/Popovers:** `surface-bright` (#31394d) – Highest prominence.

#### The "Glass & Gradient" Rule
To capture the "AI" essence, main CTAs and progress indicators should utilize a **Signature Gradient**: transitioning from `primary-container` (#4f46e5) to `secondary-container` (#571bc1). 
- **Glassmorphism:** For sidebars and overlays, use `surface-variant` at 60% opacity with a `20px` backdrop blur.

---

### 3. Typography: The Editorial Scale
We use a dual-font system to balance character with readability. **Manrope** provides a geometric, modern tech feel for headers, while **Inter** ensures maximum legibility for dense prep material.

| Role | Font | Size | Case/Weight | Use Case |
| :--- | :--- | :--- | :--- | :--- |
| **Display-LG** | Manrope | 3.5rem | Bold / -0.02em tracking | Hero marketing & AI Insights |
| **Headline-MD** | Manrope | 1.75rem | Semibold | Section titles (e.g., "Mock Interviews") |
| **Title-LG** | Inter | 1.375rem | Medium | Card titles and Module headers |
| **Body-MD** | Inter | 0.875rem | Regular | Core content and descriptions |
| **Label-SM** | Inter | 0.6875rem | Bold / All-caps | Metadata, Category tags |

---

### 4. Elevation & Depth: Tonal Layering
Traditional shadows are too "heavy" for this aesthetic. We use light to define form.

- **The Layering Principle:** Instead of a shadow, place a `surface-container-lowest` card inside a `surface-container-high` section. This "inverted nesting" creates a sophisticated, recessed look.
- **Ambient Shadows:** For floating elements (Modals/Dropdowns), use: `0px 24px 48px rgba(0, 0, 0, 0.4)`. The shadow must be tinted with `on-surface` to prevent a "dirty" gray appearance.
- **Ghost Borders:** If a boundary is required for accessibility, use `outline-variant` (#464555) at **15% opacity**. This creates a "barely-there" suggestion of a container.

---

### 5. Primitive Components

#### Buttons
- **Primary:** Gradient fill (`primary-container` to `secondary-container`). No border. `xl` roundedness (0.75rem).
- **Secondary:** Surface-bright background with a "Ghost Border."
- **Tertiary:** Text-only using `primary` (#c3c0ff) with a subtle underline on hover.

#### Cards & Lists
- **The Rule:** No divider lines between list items. Use 8px of vertical spacing and a subtle `surface-variant` background shift on hover. 
- **Visuals:** Cards should use `lg` (0.5rem) corner radius. Use a `0.5px` inner stroke of `primary` at 10% opacity to simulate a "glass edge."

#### AI Progress Indicators
- **Style:** Instead of a standard bar, use a "Glow Track." A `surface-container-highest` background with a `tertiary` (#89ceff) fill that has a `box-shadow: 0 0 12px #89ceff`.

#### Dashboard Sidebar
- **Execution:** Full-height `surface-container-lowest`. Active states should not use a background block; instead, use a vertical `primary` pill (2px width) on the left edge and shift the text color to `on-primary-fixed`.

---

### 6. Do's and Don'ts

#### Do
- **Do** use `manrope` for numbers and data visualizations; it feels more "engineered."
- **Do** overlap elements. A 3D illustration or "AI Glow" should bleed out of its container and onto the background.
- **Do** use `back-drop-blur` on navigation bars to maintain the sense of a continuous environment.

#### Don't
- **Don't** use pure black (#000000) or pure white (#FFFFFF). Use the provided `surface` and `on-surface` tokens to maintain tonal depth.
- **Don't** use 100% opaque borders. They break the "Prism" illusion.
- **Don't** use standard "Blue" links. Use `primary` (#c3c0ff) for a more refined, indigo-leaning professional feel.
- **Don't** crowd the UI. If a screen feels busy, increase the background-to-component ratio. High-end design breathes.

---

### 7. Signature Interaction: The "Insight Hover"
When a user hovers over a mock-test card or a performance metric, the card should scale to `1.02` using a `cubic-bezier(0.2, 0.8, 0.2, 1)` transition. Simultaneously, increase the `backdrop-blur` of the element, making it appear as if it is lifting closer to the user's eye.