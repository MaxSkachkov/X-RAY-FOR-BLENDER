# X-RAY FOR BLENDER — design and interaction notes

## Product boundary

The app has two separate workflows: preparing 2D character reference views and inspecting an already-created 3D model. It never implies that photographs create a model or rig automatically. Blender remains the production tool for modeling, rig construction, IK, constraints, drivers and Rigify.

## Visual direction

- Warm paper background, graphite text, one quiet blue accent.
- Flat, spacious page structure. Use soft neumorphic shadows only to distinguish a small number of interactive surfaces.
- Avoid decorative gradients, heavy borders and stacked card layouts.
- Put the character viewport first in the model inspection area; keep controls secondary.
- On narrow screens, keep the viewport above the controls and let the document scroll normally.

## Accessibility and agent use

- Core actions use named HTML buttons, links, file inputs, selects and range controls.
- Keep focus visible, respect reduced motion, and provide readable status text beside the WebGL canvas.
- Display model filename, mesh count, skeleton state, bone count, selected bone and current mode as text.
- Human and programmatic actions share native control events and one viewer state.

## Data and compatibility

- Reference images are previewed with browser object URLs and are not persisted.
- User models are read locally. GLB is accepted; glTF is accepted only when buffers and images are embedded as data URLs. External file resources are rejected.
- GLB skinning, mesh and embedded animations are viewable when present. A mesh without a skin has no bone features.
- Pose checks require explicit mapping. Initial matching uses exact bone names only; users can map unmatched bones through native selects.
- No `.blend` export is offered.

## Tokens

| Token | Value | Use |
| --- | --- | --- |
| Paper | `#f4f0e7` | Main page |
| Paper deep | `#ebe5d9` | Viewer section |
| Surface | `#f8f5ed` | Controls |
| Ink | `#252b31` | Main text |
| Ink soft | `#59626c` | Secondary text |
| Blue | `#446d9b` | Action and selected state |
| Warm accent | `#b17f57` | Small emphasis |

## Assets

The display concept image is explanatory only. The interactive demo is a separate authored GLB mannequin with a real skin and joint hierarchy, dedicated to CC0 1.0.
