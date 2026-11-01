# X-RAY FOR BLENDER — evolving design notes

Carry the useful visual references from previous work into this tool, adapting them to a precise 3D workstation.

## Direction

- Warm light background, graphite text, and one calm blue accent.
- Quiet composition with clear type hierarchy, broad spacing, and logical grouping.
- Mostly flat surfaces. Use only a faint raised or inset treatment where it clarifies a control; avoid heavy shadows, decorative borders, gradients, and stacks of cards.
- Keep the 3D model visually dominant and keep controls secondary.
- Explain one task at a time in familiar language. Make the workflow visible: prepare references → load a model → check a pose.
- Use small, measured visual cues. Never use a static illustration as a substitute for an interactive 3D model.

## Tokens

| Token | Value | Use |
| --- | --- | --- |
| Warm background | #f4f1eb | Main page background |
| Secondary background | #ece9e3 | Viewer section |
| Surface | #f8f6f1 | Controls and quiet panels |
| Graphite | #282d33 | Primary text |
| Supporting text | #535d67 | Explanations |
| Blue | #476f95 | Primary controls and selected states |
| Deep blue | #315776 | Links and emphasis |
| Pale blue | #e8eef4 | Low-key highlights |
| Warm detail | #d6b786 | Small secondary marker |
| Error | #a34242 | Error text only |

## Type and spacing

- Use a system font stack with Cyrillic glyphs.
- Body copy is 16px or larger; supporting labels remain comfortably readable.
- Headings use responsive sizes and compact line-height.
- Keep 18–24px between related elements and wider gaps between sections.
- At phone widths, place the model viewer before its settings and stack settings below it.

## Interaction and accessibility

- Use native buttons, inputs, selects, fieldsets, and labels with stable names.
- Minimum control height: 44px.
- Keep keyboard focus visible; support keyboard camera controls and reduced motion.
- Do not trap page scrolling inside the viewer. On touch, preserve vertical page scrolling.
- Put the model name, skeleton state, bone and mesh counts, display mode, selected bone, and load status in regular HTML beside the canvas.
- Report missing WebGL and unsupported models in text.

## Visualization rules

- Surface, wireframe overlay, real skeleton, and X-ray must be views of the same loaded model, camera, and pose.
- Show bones from the file's skinning hierarchy; do not invent anatomy or Rigify controls.
- If a graphic represents a value, label its unit and scale.
- Apose reference images describe the model shape; bent limbs are separate deformation checks.

## Reuse

These foundations can inform future Kolomo Systems tools. Keep product-specific labels, dimensions, and control groups local to each project.
