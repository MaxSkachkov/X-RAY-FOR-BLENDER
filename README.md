# X-RAY FOR BLENDER

A small, browser-based companion for preparing character references and inspecting a finished GLB/glTF model before or alongside Blender work.

**Live app:** [maxskachkov.github.io/X-RAY-FOR-BLENDER](https://maxskachkov.github.io/X-RAY-FOR-BLENDER/)  
**Languages:** English (default), Slovak, Ukrainian, Russian.

## What it does

- Guides you through four consistent orthographic character reference views, with optional three-quarter and detail images.
- Copies a detailed text prompt for generating a character turnaround.
- Previews reference images locally in the current browser tab.
- Loads local GLB or self-contained glTF files in a real Three.js WebGL viewer.
- Displays the same loaded model in surface, wireframe, skeleton, and translucent overlay modes.
- Lists real skin bones and meshes, supports camera views, selected-bone rotation, pose checks after explicit bone mapping, and embedded glTF animation clips.
- Includes an original low-poly rigged mannequin for trying the viewer.

## What it does not do

This is a viewer and preparation helper, not a Blender replacement. It does not create a 3D model or rig from photographs. It does not expose Blender IK, constraints, drivers, Rigify controls, or export `.blend` files.

## Run locally

This is a static site. There is no build step or package manager. Serve the repository root over HTTP (for example, `python -m http.server 8000`) and open `http://localhost:8000/`. The 3D viewer imports a pinned Three.js version from jsDelivr; reference preparation remains available if WebGL is unavailable.

The viewer accepts `.glb` and `.gltf` files up to 50 MB. A `.gltf` must embed its buffers and images as data URLs. External file references are rejected. Draco-, Meshopt- and KTX2-compressed assets may require decoders that are not bundled in this MVP. User files are processed in the browser and are not uploaded or added to this repository.

## Deployment and search metadata

GitHub Pages publishes this repository. The default English page is at `/X-RAY-FOR-BLENDER/`; localized routes are `/X-RAY-FOR-BLENDER/sk/`, `/X-RAY-FOR-BLENDER/uk/`, and `/X-RAY-FOR-BLENDER/ru/`. Canonical URLs, `hreflang`, Open Graph metadata, `robots.txt`, and `sitemap.xml` describe these routes.

## Assets and licensing

- `assets/demo-rigged.glb` is an original low-poly skinned demo mannequin authored for this project and dedicated to the public domain under CC0 1.0. Attribution: X-RAY FOR BLENDER project.
- `assets/three-modes-concept.webp` is a compressed copy of the user-provided concept illustration. It is clearly labeled as an illustration and is not rendered as the live model.
- The application source is licensed under MIT (see `LICENSE`). Existing legacy images in `img/` are not used by the app and are not covered by the source license.

## Checks

The repository does not require a build. Before release, check JavaScript syntax, the GLB container and accessors, localized route metadata, and the live GitHub Pages deployment. Browser-level WebGL behavior depends on the user's browser and GPU.
