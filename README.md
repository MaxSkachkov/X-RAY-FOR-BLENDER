# X-RAY FOR BLENDER

**Prepare character references. Inspect a real model. Check a pose.**

A browser-based companion for character modeling in Blender. It keeps two workflows separate:

1. **Prepare 2D references** — organize one image per view, keep the same neutral A-pose, and copy a prompt for image generation.
2. **Inspect a 3D model** — open a self-contained GLB and inspect its surface, wireframe, skinning skeleton, bones, and included animation clips.

The reference workflow does not make a mesh or rig from photographs. This is a preparation and inspection tool, not a replacement for Blender.

## Languages

English is the primary language. Slovak, Ukrainian, and Russian are available from the language selector. The selected language is reflected in page metadata and shareable `?lang=` URLs.

## Features

- Separate front, back, left, and right reference-image slots, plus optional detail views.
- Local image preview and file checks. Images are not uploaded or saved.
- A real Three.js WebGL viewer for GLB 2.0.
- Surface, surface-plus-wireframe, real bone hierarchy, and translucent X-ray modes share the same model, camera, and pose.
- Camera presets, selected-bone rotation, reset, and animations that are included in the file.
- Pose-check buttons require matched left/right bones. Suggestions are made only for unambiguous names; review or map them manually.
- The licensed RobotExpressive sample is fetched only after the user selects **Load licensed demo**.

## Privacy and file limits

User files stay in the browser. The application makes no upload request for reference images or GLB files. The optional demo model is fetched from the pinned Three.js r182 source. Three.js itself is loaded from a version-pinned jsDelivr URL.

- Reference images: PNG, JPEG, or WebP; maximum 12 MB per image and bounded preview dimensions.
- 3D model: self-contained GLB 2.0 only; maximum 30 MB.
- External buffer and texture URLs inside a user GLB are rejected. Required compression extensions without a configured decoder are rejected.
- Replacing a model disposes its geometry, materials, textures, animation mixer, and skeleton helpers.

## Blender and GLB limitations

The viewer reads mesh geometry, skinned meshes, actual bones, and animation clips available in GLB. It does not reproduce Blender IK, constraints, drivers, Rigify controls, or authoring tools. Rotation previews use a simple local-axis change; local bone axes differ between rigs. Use Blender to author and validate a complete rig.

A model without a skinning skeleton still opens for surface and wireframe inspection. Bone, X-ray, and pose controls are disabled and the viewer reports that no animation skeleton is present.

## Run locally

This is a static site with no application dependencies or build step. Serve the repository over HTTP so browser modules and file APIs work:

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000`. The 3D viewer needs WebGL and an internet connection for the pinned Three.js modules. Reference-image slots remain available if WebGL or the 3D library is unavailable.

Run the dependency-free safety and bone-mapping checks with:

```sh
npm test
```

## Demo model credit

**RobotExpressive** by Tomás Laulhé (Quaternius), with modifications by Don McCurdy. **CC0 1.0 Universal.** The demo is an animated robot character, not an anatomical reference model. See [the model notes and license](https://github.com/mrdoob/three.js/tree/r182/examples/models/gltf/RobotExpressive).

## Third-party software and media

See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md). Legacy city photographs in `img/` are not used by this application and are not covered by the project's source-code license; their reuse rights have not been established.

## License

The X-RAY FOR BLENDER application source and project documentation are licensed under the MIT License. The MIT grant excludes the legacy images in `img/` and third-party assets, which are governed by their own terms.
