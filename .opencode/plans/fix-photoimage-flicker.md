# Fix PhotoImage Flickering Bug

## Overview

The PhotoImage component exhibits a flickering behavior where images briefly disappear to white after initial display. This is caused by:
1. Conditional DOM removal of the placeholder skeleton
2. Position change (`absolute` → `relative`) during opacity transition
3. Missing `sizes` prop on Next.js Image

This plan fixes the core flickering issue and improves the component with:
- Proper stacking/layering that doesn't cause layout shifts
- Dynamic aspect ratio based on actual image dimensions
- Reasonable default `sizes` value with optional override

## Tasks

- [ ] **Refactor PhotoImage to use stable layering** - Keep both placeholder and image in DOM at all times; use opacity transitions for both; eliminate position changes during transition; use CSS `inset-0` for absolute positioning within the container

- [ ] **Use dynamic aspect ratio from StaticImageData** - Replace hardcoded `aspect-square` with inline style using `src.width` and `src.height` to compute the actual aspect ratio; apply to container element

- [ ] **Add sizes prop with sensible default** - Add optional `sizes` prop to PhotoImage; use a default value of `"100vw"` or compute from `src.width` (e.g., `${src.width}px`); this tells the browser the image won't exceed its intrinsic width

- [ ] **Update PhotoImage usages (if needed)** - Review and update the three call sites if the API changes require it

- [ ] **Manual test the fix** - Verify the flickering is resolved on all three pages; confirm reduced-motion preferences still work
