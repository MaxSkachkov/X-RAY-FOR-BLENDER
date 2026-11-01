# Skachkov Design — visual principles

This file carries the visual references from the DEMOFIZ redesign into the portfolio and future product pages. Treat the tokens as a starting point; extend them when a real product need calls for it.

## Direction

- Use a warm, quiet canvas with generous space and clear reading order.
- Use soft neumorphic relief sparingly: one lifted surface or inset control can show interaction. Avoid adding shadows to every element.
- Keep the page calm and useful. Each section answers one question; use short, familiar wording.
- Use diagrams and visualizations to explain a process or relationship. Make them measurable with labels, units, and a clear scale when data is involved.
- Prefer original CSS or SVG diagrams over decorative stock imagery for explanatory visuals.

## Core colors

| Token | Value | Use |
| --- | --- | --- |
| Paper | #f4f0e7 | Main page background |
| Paper deep | #ebe5d9 | Quiet section background |
| Surface | #f7f3eb | Cards and raised controls |
| Ink | #173b3a | Main text |
| Ink soft | #526763 | Supporting text |
| Teal | #176c68 | Links, active states, key data |
| Teal dark | #105653 | Dark teal interaction states |
| Warm accent | #d07c54 | Small emphasis or current value |
| Fine line | #ded8cb | Low contrast separators |

## Shape and depth

- Main cards: 28px radius.
- Controls: 16px radius; use pill shape only for small navigation actions.
- Raised surfaces: paired, low contrast shadows from the raised shadow token.
- Inset surfaces: use the inset shadow token only when an input or selected control needs to look recessed.
- Keep borders subtle. Add a visible focus ring for keyboard use even when the visual style is soft.

## Type and spacing

- Use a system sans-serif stack for legibility and quick loading.
- Use large, compact headings and a comfortable body line-height around 1.6.
- Keep paragraph width limited and split complex information into a short sequence.
- Use responsive sizes with clamp() and leave at least 18–24px between related controls.
- On narrow screens, stack content instead of shrinking controls or labels.

## Interaction and accessibility

- Give each page one clear primary action.
- Use labels that describe the result of an action.
- Keep keyboard focus visible and provide a skip link on long pages.
- Respect prefers-reduced-motion.
- Do not encode meaning with color alone; pair it with text, shape, or position.

## Visualization rules

- A diagram should explain one relationship at a time.
- Label axes, values, and units whenever the visualization represents measurements.
- Use a quiet base line and one accent for the active value or result.
- Avoid decorative grids, legends, and labels that do not help answer the learner's question.
- For physics simulations, let changing a value produce an immediate, visible, correctly scaled change.

## Current implementation

The portfolio uses these tokens in main.css: warm paper backgrounds, restrained teal and rust accents, spacious sections, soft raised cards, responsive steps, and a hand-built DEMOFIZ preview. Apply the same principles to new pages without copying page-specific layout wholesale.
